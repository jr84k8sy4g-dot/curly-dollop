# Change History

Format defined in `skills/01-development.md`:

- **Version** · **Date** · **Title** · **Brief Summary**

---

## v0.1.0 · 2026-05-24 · Initial scaffold (Drug Dosage CDSS)

Bootstrapped a hospital-grade Clinical Decision Support System for drug
dosage calculation. Delivered the full MVP across the architecture
defined in the user brief.

**Frontend**
- Next.js 14 App Router · TypeScript strict · Tailwind · Soft UI
  system applied from `skills/05-ui/`.
- App shell: collapsible sidebar (`components/layout/Sidebar.tsx`),
  responsive topbar with dark-mode toggle persisted to `localStorage`.
- Dashboard (`app/dashboard/page.tsx`): patient panel with auto
  BMI/IBW/ABW/BSA, real-time drug search with category filter,
  favorites and recents, dose calculator with six modes
  (weight/BSA/pediatric/fixed/infusion/bolus), clinical alerts panel,
  drug monograph card, and printable / exportable dose report.
- Analytics page (`app/analytics/page.tsx`) with Recharts area chart,
  most-used drugs leaderboard, recent activity timeline, compliance
  card.
- Drug library (`app/drugs/page.tsx`) and patient registry
  (`app/patients/page.tsx`).
- Re-usable Soft UI primitives in `components/ui/`: Card, StatCard,
  Badge, Button, Input, Select, Textarea, Alert.

**Domain logic**
- Strict typings split into `lib/types/drug-types.ts` and
  `lib/types/calc-types.ts` per coding standard.
- Pure calculation engine in `lib/calc/`:
  - `patient.ts` — BMI, Devine IBW, ABW (0.4 factor), Mosteller BSA.
  - `dose.ts` — weight / BSA / fixed / pediatric / bolus / infusion;
    renal adjustment by eGFR threshold; hepatic adjustment scaled by
    severity; max-dose, allergy, interaction warnings.
  - `infusion.ts` — mL/hr, drops/min, total volume.
- 30-drug formulary in `lib/data/drugs.ts` covering anesthesia,
  analgesia, antibiotics, vasopressors, NMBs, antiemetics,
  anticoagulants, bronchodilators, electrolytes, and emergency drugs.
- 4 sample patients in `lib/data/patients.ts` for demo / e2e.

**API**
- Next.js route handlers under `app/api/` matching the production
  NestJS contract documented in `docs/API.md`:
  `/drugs`, `/drugs/:id`, `/patients`, `/calculate`, `/prescriptions`,
  `/analytics`, `/reports`.
- Zod schemas at every input boundary.

**Database & infrastructure**
- `db/schema.sql` — 11-table Postgres schema with pgcrypto, pg_trgm,
  audit trail, RBAC (roles · permissions · role_permissions), seed
  data for roles/permissions, `touch_updated_at` triggers.
- `db/seeds/drugs.seed.sql` — minimal formulary seed.
- Multi-stage `Dockerfile` and `docker-compose.yml` for app +
  postgres + redis.

**Documentation**
- `docs/ARCHITECTURE.md` · `docs/ERD.md` · `docs/API.md` ·
  `docs/USER_FLOWS.md` · `docs/WIREFRAMES.md`.

**Tests**
- Vitest unit tests for patient and dose calc engine in
  `tests/calc/*.test.ts`.

---

## v0.1.1 · 2026-05-25 · Schema alignment & seed restructuring

Replaced the stale single `db/seeds/drugs.seed.sql` (which used a
`cdss.` namespace and column names that no longer matched the schema)
with three ordered seeds that load cleanly against `db/schema.sql`:

- `db/seeds/001_role_permissions.sql` — wires default permission
  grants for physician / pharmacist / nurse / admin / auditor.
- `db/seeds/002_drug_categories.sql` — 13 category codes.
- `db/seeds/003_drugs.sql` — schema-matching subset of the full
  formulary plus three sample `dose_formulas` rows.

Updated `docker-compose.yml` to mount the three seeds in order under
`/docker-entrypoint-initdb.d/`. Updated `Dockerfile` to a cleaner
multi-stage build (`builder` + `runner`) with explicit ownership.
Tightened `tsconfig.json` with `ignoreDeprecations: "6.0"` to silence
the TS 7 `baseUrl` deprecation while keeping the `@/*` path alias.
Updated `README.md` to reference the new seed file naming.

**BUG (resolved during scaffold)**
- file: `tsconfig.json` line 21 — `baseUrl` deprecation warning.
  Fixed by adding `"ignoreDeprecations": "6.0"`.

---

## v0.1.2 · 2026-05-25 · Reports, Audit Log & Settings pages

Filled the three sidebar items that previously dead-ended on
in-page hashes. All routes share the existing `AppShell` and the
Soft UI primitives — no new visual conventions introduced.

**New routes**
- `app/audit/page.tsx` — tamper-evident audit trail viewer with
  free-text search, action / role / severity filters, four KPI
  cards (total, today, warnings, critical blocks), and a one-click
  CSV export of the filtered set. Backed by `app/api/audit/route.ts`
  which honours the same filters server-side.
- `app/reports/page.tsx` — report generator (kind · date range ·
  format) wired to the existing `app/api/reports/route.ts`,
  five report templates (drug utilization, safety blocks, renal /
  hepatic adjustments, prescription activity, compliance summary),
  recent-reports table with per-row download.
- `app/settings/page.tsx` — sectioned settings page with left-rail
  nav: Profile, Units & Locale, Safety Rules, Notifications,
  Appearance. Toggle-driven preferences for safety guardrails
  (allergy block, renal / hepatic banners, pediatric double-check),
  notification channels, and appearance.

**Typings (per `skills/05-coding-standards.md`)**
- `lib/types/audit-types.ts` — `AuditEntry`, `AuditAction`,
  `AuditSeverity`, `AuditActorRole`, `AuditQuery`.
- `lib/types/report-types.ts` — `ReportKind`, `ReportFormat`,
  `ReportRecord`, `ReportDefinition`, `GenerateReportInput`.
- `lib/types/settings-types.ts` — `AccountSettings` and the five
  preference sub-shapes.

**Data fixtures**
- `lib/data/audit.ts` — 11-entry seed log with `ACTION_LABELS` map
  and a `filterAudit` helper shared by the page and API.
- `lib/data/reports.ts` — `REPORT_DEFINITIONS`, `RECENT_REPORTS`,
  and `buildSampleReportPayload` for export payload shaping.
- `lib/data/settings.ts` — `DEFAULT_SETTINGS` constant.

**Re-usable component**
- `components/ui/Toggle.tsx` — Soft UI switch with label /
  description rows, used across Safety, Notifications, Appearance.

**Menus**
- `lib/menus.ts` — Reports / Audit Log / Settings hrefs changed
  from in-page hash anchors to real top-level routes
  (`/reports`, `/audit`, `/settings`).

**Verification**
- `npm run typecheck` clean.
- `npm test` — 12 / 12 pass.
- Dev server: `/reports`, `/audit`, `/settings` and
  `/api/audit?severity=danger` all return 200 with no compile
  errors.
