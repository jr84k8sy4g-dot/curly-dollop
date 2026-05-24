# API Documentation

All endpoints are namespaced under `/api`. Production deployments
should put a NestJS service behind the same path so the frontend
contract is unchanged.

Per `skills/05-coding-standards.md`, frontend code consumes APIs via the
feature name (e.g. `drugs`, `patients`) — never the literal `/api` prefix,
which is read from `NEXT_PUBLIC_API_BASE`.

## Authentication

Future: `POST /api/auth/login` → `{access, refresh}` JWT pair.
All non-auth endpoints require `Authorization: Bearer <jwt>`.

## Drugs

### `GET /api/drugs`
List drugs.

Query parameters:
| Name | Type | Description |
| --- | --- | --- |
| q | string | Free-text search (name, generic, brand) |
| category | string | Filter by category |

Response:
```json
{
  "total": 30,
  "drugs": [
    { "id": "propofol", "name": "Propofol", "genericName": "propofol",
      "category": "Anesthetic", "defaultRoute": "IV",
      "concentration": "10 mg/mL" }
  ]
}
```

### `GET /api/drugs/:id`
Full monograph including dose ranges, mechanism, contraindications,
warnings, interactions, monitoring, and references.

## Patients

### `GET /api/patients`
List patients (admin / clinician scope).

### `POST /api/patients`
Create a patient. Body validated with zod schema. Returns the new
patient with derived BMI/IBW/ABW/BSA computed server-side.

## Calculate

### `POST /api/calculate`
Calculate a dose. Pure, deterministic.

Request:
```json
{
  "drugId": "propofol",
  "patientId": "P-1001",
  "mode": "weight",
  "doseValue": 2,
  "doseUnit": "mg/kg",
  "concentrationMgPerMl": 10,
  "durationMinutes": 60,
  "dropFactor": 20
}
```

Response:
```json
{
  "drug": "propofol",
  "patient": "P-1001",
  "result": {
    "totalDoseMg": 124,
    "volumeMl": 12.4,
    "infusionRateMlHr": 12.4,
    "dropsPerMinute": 4.13,
    "warnings": [
      { "severity": "warning", "code": "INTERACTION",
        "title": "Drug interaction", "message": "..." }
    ],
    "notes": ["Weight-based: 2 mg/kg × 62 kg"]
  }
}
```

## Prescriptions

### `POST /api/prescriptions`
Persist a prescription (status `draft` by default). Requires
`rx.create` permission. Sign with `PATCH /api/prescriptions/:id/sign`
(requires `rx.sign`).

## Analytics

### `GET /api/analytics`
Aggregated KPIs:
```json
{
  "calculationsPerDay": 132,
  "patientsTreated": 84,
  "alertsTriggered": 83,
  "mostUsedDrugs": [...],
  "week": [...]
}
```

## Reports

### `POST /api/reports`
Render a report in `csv` or `json`. PDF generation is delegated to a
worker that renders the printable HTML in `components/dashboard/DoseReport.tsx`
to PDF via headless Chromium (puppeteer/playwright).

## Error format

```json
{
  "error": "validation_failed",
  "issues": [
    { "path": ["doseValue"], "message": "Number must be positive" }
  ]
}
```

| HTTP | Meaning |
| --- | --- |
| 400 | Validation failed |
| 401 | Missing or invalid auth |
| 403 | Insufficient permission |
| 404 | Resource not found |
| 409 | Conflict (duplicate MRN, status transition) |
| 500 | Internal — captured in observability |
