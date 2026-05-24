# CDSS — System Architecture

## 1. Vision

A hospital-grade Clinical Decision Support System (CDSS) for drug dosage
calculation, designed to be safe, auditable, and deployable across hospitals,
medical schools, and healthcare networks.

## 2. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          Clinicians (Web Browsers)                       │
└──────────────────────────────────────────────────────────────────────────┘
                                    │ HTTPS (TLS 1.3)
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                       AWS Application Load Balancer                      │
│                         · WAF · TLS termination                          │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  ▼                                   ▼
        ┌──────────────────┐                ┌──────────────────┐
        │  Next.js Web     │                │   NestJS API     │
        │  (App Router)    │ ──── REST ──▶  │   (Stateless)    │
        │  · SSR/CSR mix   │                │   · RBAC guards  │
        │  · Soft UI       │                │   · Zod / class- │
        │  · Recharts      │                │     validator    │
        └──────────────────┘                └──────────────────┘
                                                  │     │
                                ┌─────────────────┘     └─────────────────┐
                                ▼                                          ▼
                       ┌─────────────────┐                        ┌─────────────────┐
                       │   PostgreSQL    │                        │      Redis      │
                       │   · pgcrypto    │                        │  · Sessions     │
                       │   · pg_trgm     │                        │  · Rate limits  │
                       │   · audit logs  │                        │  · Drug cache   │
                       └─────────────────┘                        └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   S3 (Reports)  │
                       │   · Encrypted   │
                       │   · Versioned   │
                       └─────────────────┘
```

This MVP ships a Next.js full-stack implementation. For production a
dedicated NestJS API is recommended; the route handlers in `app/api/*`
are 1:1 with the NestJS module contract described below.

## 3. NestJS Module Map (Production target)

```
src/
  app.module.ts
  auth/                 — JWT, OAuth2, MFA
  users/                — Users, roles, permissions
  patients/             — CRUD, demographics, anthropometrics
  drugs/                — Formulary, search, monographs
  dose-formulas/        — Range definitions per population
  calculations/         — Pure calc engine (mirrors lib/calc)
  prescriptions/        — Draft → sign → administer
  clinical-safety/      — Allergy, interaction, max-dose, organ adj.
  audit/                — Append-only log via interceptor
  reports/              — PDF, CSV, JSON export
  analytics/            — Aggregations
  common/               — Guards, interceptors, pipes
```

Every controller is decorated with `@Roles()` and `@Permissions()` guards.
Every mutating action is wrapped by an `AuditInterceptor` that writes
to `audit_logs` with actor, IP, diff, and notes.

## 4. Security Architecture

| Control | Implementation |
| --- | --- |
| Authentication | JWT (short-lived) + refresh tokens · OAuth2 (Azure AD / Okta) |
| MFA | TOTP enforced for clinical roles |
| RBAC | `roles`, `permissions`, `role_permissions` tables · guard at controller |
| Encryption at rest | pgcrypto column-level for PII · S3 SSE-KMS |
| Encryption in transit | TLS 1.3, HSTS, secure cookies |
| Audit trail | Append-only `audit_logs` populated by interceptor + trigger |
| Session management | Redis with 15-min idle timeout |
| Input validation | Zod (Next.js) / class-validator (NestJS) at every boundary |
| Rate limiting | Redis token bucket · 60 req/min per user, 5/min on /auth |
| Secrets | AWS Secrets Manager (production), `.env` (dev only) |
| HIPAA | BAA-eligible AWS services; PHI segregation; logged access |

## 5. Calculation Engine

The engine is a pure functional layer (`lib/calc/`) — no DB, no I/O, no
side effects. It is identical between the Next.js app and the planned
NestJS module so calculations are deterministic and reproducible.

Inputs: patient anthropometrics + drug formula + override.
Outputs: total dose, volume, infusion rate, drops/min, warnings.

Adjustments applied in order:
1. Base calculation (weight / BSA / fixed / pediatric)
2. Renal adjustment (if eGFR below drug threshold)
3. Hepatic adjustment (scaled by severity)
4. Max-dose check (single dose, daily dose)
5. Allergy cross-match (patient.allergies vs drug names)
6. Drug-interaction match (patient.currentMedications vs drug.interactions)

## 6. Deployment

| Environment | Topology |
| --- | --- |
| Dev | docker-compose: app + postgres + redis |
| Staging | AWS ECS Fargate · 2 tasks · ALB · RDS Postgres (t3.medium) |
| Production | EKS · HPA on CPU/RPS · Aurora Postgres MultiAZ · ElastiCache Redis · CloudFront |

CI/CD: GitHub Actions → ECR → ECS/EKS rolling deploy with health checks
and automatic rollback.

## 7. Scalability & High Availability

- App: stateless containers behind ALB, horizontal scaling.
- DB: read replicas for analytics, primary for OLTP.
- Cache: Redis cluster for drug catalog and session.
- Static reports: S3 + CloudFront.
- Backups: RDS PITR (7 days hot, 30 days warm, 7 years cold for HIPAA).
- DR target: RTO 1 h, RPO 5 min.

## 8. Observability

- Application logs: structured JSON → CloudWatch → Datadog.
- Metrics: RED (rate / errors / duration) + clinical KPIs (alerts/day).
- Tracing: OpenTelemetry across web → API → DB.
- Alerts: PagerDuty for SLO breaches and audit anomalies.
