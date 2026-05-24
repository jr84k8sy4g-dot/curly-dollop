# CDSS — Drug Dosage Calculation & Clinical Decision Support System

A modern, hospital-grade web application for healthcare professionals to
search medications, calculate patient-specific dosages (adult, pediatric,
weight-based, BSA, infusion, bolus), surface clinical safety alerts
(allergy, interaction, max-dose, renal/hepatic adjustment), and generate
printable dose reports.

Built with **Next.js · TypeScript · Tailwind · Soft UI** on the frontend
and a **PostgreSQL · NestJS · Redis** target architecture on the backend.

---

## Features

- **Patient panel** — anthropometrics with auto BMI / IBW / ABW / BSA
- **Drug master search** — real-time autocomplete, categories,
  favorites, recently used; 30-drug curated formulary
- **Calculation engine** — weight, BSA, pediatric, fixed, infusion, bolus;
  renal (eGFR) and hepatic (Child-Pugh) adjustments
- **IV infusion calculator** — mL/hr, drops/min, total volume, duration
- **Clinical decision support** — allergy, interaction, max-dose,
  renal/hepatic alerts with critical / warning / info severities
- **Drug monograph** — mechanism, indications, contraindications,
  warnings, interactions, monitoring, references
- **Reporting** — printable patient dose report; export to CSV / JSON;
  PDF via browser print pipeline
- **Analytics dashboard** — calculations/day, patients treated, most-used
  drugs, alerts triggered, drug-utilization area chart, activity timeline
- **HIPAA-grade security blueprint** — RBAC, MFA, audit trail, encryption
  at rest and in transit (see `docs/ARCHITECTURE.md`)

## Quick start

```bash
npm install
npm run dev          # Next.js dev server at http://localhost:3000
npm run test         # vitest unit tests for the calc engine
npm run typecheck    # tsc --noEmit
npm run build        # production build
```

## Docker (full stack)

```bash
docker compose up --build
# app   → http://localhost:3000
# db    → postgres://cdss:cdss@localhost:5432/cdss
# cache → redis://localhost:6379
```

`db/schema.sql` and the `db/seeds/00*.sql` files auto-load on first run
(roles → categories → drugs).

## Project layout

```
app/              Next.js App Router (UI + route handlers)
  api/            Drugs · patients · calculate · prescriptions · reports · analytics
  dashboard/      Clinical workspace
  analytics/      Insights
  drugs/          Formulary
  patients/       Registry

components/
  ui/             Card, StatCard, Button, Input, Select, Badge, Alert, Textarea
  layout/         AppShell, Sidebar, Topbar
  dashboard/      PatientPanel, DrugSearch, DoseCalculator, ClinicalAlerts,
                  DrugDetailCard, DoseReport
  analytics/      UtilizationChart, MostUsedDrugs, ActivityTimeline

lib/
  calc/           Pure dose & patient calculation engine
  data/           Drug formulary + sample patients
  types/          Domain types
  menus.ts        Navigation registry (per coding standards)
  utils.ts        cn(), formatters

db/               PostgreSQL DDL + seeds
docs/             Architecture, ERD, API, user flows, wireframes
tests/calc/       Vitest unit tests
agent/history.md  Change log
```

## Tech stack

| Layer | Tech |
| --- | --- |
| UI | Next.js 14 (App Router), React 18, TypeScript strict |
| Styling | Tailwind CSS, Soft UI tokens (`skills/05-ui/`) |
| Charts | Recharts |
| Validation | Zod |
| Backend (target) | NestJS, PostgreSQL 15, Redis |
| Auth | JWT + OAuth2, MFA (TOTP) |
| Hosting | Docker, Kubernetes, AWS (ECS/EKS, RDS, ElastiCache, S3, CloudFront) |

## Documentation

| Doc | Contents |
| --- | --- |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | System diagram, NestJS module map, security model, scalability, observability |
| [`docs/ERD.md`](docs/ERD.md) | Entity relationships and cardinalities |
| [`docs/API.md`](docs/API.md) | REST contract with example payloads |
| [`docs/USER_FLOWS.md`](docs/USER_FLOWS.md) | Primary clinical flow, allergy override flow, RBAC matrix |
| [`docs/WIREFRAMES.md`](docs/WIREFRAMES.md) | ASCII wireframes for dashboard, analytics, library |

## Disclaimer

This system is a clinical decision support tool. All recommendations
must be verified against institutional protocols and current
pharmacology references before administration. Not a substitute for
clinical judgment.
