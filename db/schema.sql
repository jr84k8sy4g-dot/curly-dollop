-- ─────────────────────────────────────────────────────────────────────────────
-- CDSS — Drug Dosage Calculation & Clinical Decision Support System
-- PostgreSQL 15+ schema with RBAC, audit trail, and HIPAA-grade controls.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

CREATE SCHEMA IF NOT EXISTS cdss;
SET search_path TO cdss, public;

-- ─────────────────────────── RBAC ───────────────────────────
CREATE TABLE roles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code        TEXT UNIQUE NOT NULL,
    name        TEXT NOT NULL,
    description TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE permissions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code        TEXT UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE role_permissions (
    role_id       UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           CITEXT UNIQUE NOT NULL,
    password_hash   TEXT NOT NULL,
    full_name       TEXT NOT NULL,
    license_number  TEXT,
    role_id         UUID NOT NULL REFERENCES roles(id),
    mfa_enabled     BOOLEAN NOT NULL DEFAULT TRUE,
    mfa_secret      TEXT,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX users_role_idx ON users(role_id);

-- ─────────────────────────── DRUGS ───────────────────────────
CREATE TABLE drug_categories (
    id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE drugs (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug              TEXT UNIQUE NOT NULL,
    name              TEXT NOT NULL,
    generic_name      TEXT NOT NULL,
    brand_names       TEXT[] NOT NULL DEFAULT '{}',
    category_id       UUID REFERENCES drug_categories(id),
    default_route     TEXT NOT NULL,
    routes            TEXT[] NOT NULL,
    concentration     TEXT NOT NULL,
    indications       TEXT[] NOT NULL DEFAULT '{}',
    contraindications TEXT[] NOT NULL DEFAULT '{}',
    warnings          TEXT[] NOT NULL DEFAULT '{}',
    interactions      TEXT[] NOT NULL DEFAULT '{}',
    mechanism         TEXT,
    monitoring        TEXT[] NOT NULL DEFAULT '{}',
    references        TEXT[] NOT NULL DEFAULT '{}',
    is_high_alert     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX drugs_name_trgm ON drugs USING gin (name gin_trgm_ops);
CREATE INDEX drugs_generic_trgm ON drugs USING gin (generic_name gin_trgm_ops);
CREATE INDEX drugs_brand_idx ON drugs USING gin (brand_names);

CREATE TABLE dose_formulas (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    drug_id             UUID NOT NULL REFERENCES drugs(id) ON DELETE CASCADE,
    population          TEXT NOT NULL CHECK (population IN ('adult','pediatric','neonatal','geriatric')),
    basis               TEXT NOT NULL CHECK (basis IN ('weight','bsa','fixed','age')),
    min_dose            NUMERIC(10,4) NOT NULL,
    max_dose            NUMERIC(10,4) NOT NULL,
    unit                TEXT NOT NULL,
    max_single_dose     NUMERIC(10,4),
    max_daily_dose      NUMERIC(10,4),
    renal_threshold     NUMERIC(6,2),
    renal_reduction     NUMERIC(4,3),
    renal_note          TEXT,
    hepatic_reduction   NUMERIC(4,3),
    hepatic_note        TEXT,
    notes               TEXT,
    UNIQUE(drug_id, population, basis)
);

CREATE TABLE drug_interactions (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    drug_a_id     UUID NOT NULL REFERENCES drugs(id) ON DELETE CASCADE,
    drug_b_id     UUID NOT NULL REFERENCES drugs(id) ON DELETE CASCADE,
    severity      TEXT NOT NULL CHECK (severity IN ('info','warning','critical')),
    description   TEXT NOT NULL,
    mechanism     TEXT,
    management    TEXT,
    references    TEXT[] DEFAULT '{}',
    CHECK (drug_a_id <> drug_b_id)
);

CREATE INDEX drug_interactions_a_idx ON drug_interactions(drug_a_id);
CREATE INDEX drug_interactions_b_idx ON drug_interactions(drug_b_id);

CREATE TABLE clinical_warnings (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code        TEXT UNIQUE NOT NULL,
    severity    TEXT NOT NULL CHECK (severity IN ('info','warning','critical')),
    title       TEXT NOT NULL,
    template    TEXT NOT NULL
);

-- ─────────────────────────── PATIENTS ───────────────────────────
CREATE TABLE patients (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mrn                 TEXT UNIQUE NOT NULL,
    full_name           TEXT NOT NULL,
    weight_kg           NUMERIC(6,2) NOT NULL,
    height_cm           NUMERIC(6,2) NOT NULL,
    date_of_birth       DATE NOT NULL,
    gender              TEXT NOT NULL CHECK (gender IN ('male','female','other')),
    egfr                NUMERIC(6,2),
    hepatic_impairment  TEXT CHECK (hepatic_impairment IN ('none','mild','moderate','severe')) DEFAULT 'none',
    allergies           TEXT[] NOT NULL DEFAULT '{}',
    conditions          TEXT[] NOT NULL DEFAULT '{}',
    current_meds        TEXT[] NOT NULL DEFAULT '{}',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at          TIMESTAMPTZ
);

CREATE INDEX patients_mrn_idx ON patients(mrn);
CREATE INDEX patients_name_trgm ON patients USING gin (full_name gin_trgm_ops);

-- ─────────────────────────── PRESCRIPTIONS ───────────────────────────
CREATE TABLE prescriptions (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id        UUID NOT NULL REFERENCES patients(id),
    drug_id           UUID NOT NULL REFERENCES drugs(id),
    prescribed_by     UUID NOT NULL REFERENCES users(id),
    mode              TEXT NOT NULL,
    dose_value        NUMERIC(10,4) NOT NULL,
    dose_unit         TEXT NOT NULL,
    total_dose_mg     NUMERIC(10,4) NOT NULL,
    route             TEXT NOT NULL,
    concentration     NUMERIC(10,4),
    volume_ml         NUMERIC(10,4),
    rate_ml_hr        NUMERIC(10,4),
    duration_minutes  INT,
    physician_notes   TEXT,
    warnings          JSONB NOT NULL DEFAULT '[]'::jsonb,
    status            TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','signed','administered','cancelled')),
    signed_at         TIMESTAMPTZ,
    administered_at   TIMESTAMPTZ,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX rx_patient_idx ON prescriptions(patient_id);
CREATE INDEX rx_drug_idx ON prescriptions(drug_id);
CREATE INDEX rx_prescriber_idx ON prescriptions(prescribed_by);
CREATE INDEX rx_status_idx ON prescriptions(status);

-- ─────────────────────────── AUDIT ───────────────────────────
CREATE TABLE audit_logs (
    id          BIGSERIAL PRIMARY KEY,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    actor_id    UUID,
    actor_role  TEXT,
    ip          INET,
    user_agent  TEXT,
    entity      TEXT NOT NULL,
    entity_id   TEXT,
    action      TEXT NOT NULL,
    diff        JSONB,
    notes       TEXT
);

CREATE INDEX audit_actor_idx ON audit_logs(actor_id);
CREATE INDEX audit_entity_idx ON audit_logs(entity, entity_id);
CREATE INDEX audit_occurred_idx ON audit_logs(occurred_at);

-- ─────────────────────────── TRIGGERS ───────────────────────────
CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER drugs_touch BEFORE UPDATE ON drugs
    FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
CREATE TRIGGER users_touch BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
CREATE TRIGGER patients_touch BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
CREATE TRIGGER prescriptions_touch BEFORE UPDATE ON prescriptions
    FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- ─────────────────────────── SEED ROLES ───────────────────────────
INSERT INTO roles (code, name, description) VALUES
    ('physician',   'Physician',   'Can prescribe and view all clinical data'),
    ('pharmacist',  'Pharmacist',  'Can verify orders and adjust formulary'),
    ('nurse',       'Nurse',       'Can view orders and document administration'),
    ('admin',       'Administrator', 'Can manage users, roles, and configuration'),
    ('auditor',     'Auditor',     'Read-only access to audit and compliance reports')
ON CONFLICT (code) DO NOTHING;

INSERT INTO permissions (code, description) VALUES
    ('rx.create',       'Create prescription'),
    ('rx.sign',         'Sign prescription'),
    ('rx.administer',   'Administer prescription'),
    ('rx.view',         'View prescriptions'),
    ('patient.create',  'Create patient'),
    ('patient.update',  'Update patient'),
    ('patient.view',    'View patients'),
    ('drug.manage',     'Manage drug formulary'),
    ('users.manage',    'Manage users and roles'),
    ('audit.view',      'View audit logs')
ON CONFLICT (code) DO NOTHING;

-- Map default permissions
WITH r AS (
    SELECT id, code FROM roles
), p AS (
    SELECT id, code FROM permissions
)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM r, p
WHERE
    (r.code = 'physician'  AND p.code IN ('rx.create','rx.sign','rx.view','patient.view','patient.update'))
 OR (r.code = 'pharmacist' AND p.code IN ('rx.view','drug.manage','patient.view'))
 OR (r.code = 'nurse'      AND p.code IN ('rx.view','rx.administer','patient.view'))
 OR (r.code = 'admin'      AND p.code IN ('users.manage','drug.manage','audit.view'))
 OR (r.code = 'auditor'    AND p.code IN ('audit.view','rx.view','patient.view'))
ON CONFLICT DO NOTHING;
