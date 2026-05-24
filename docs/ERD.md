# Entity Relationship Diagram

```
┌──────────────┐         ┌──────────────────┐         ┌───────────────────┐
│   roles      │◄────────│ role_permissions │────────►│   permissions     │
└──────┬───────┘         └──────────────────┘         └───────────────────┘
       │ 1
       │
       ▼ *
┌──────────────┐
│   users      │
└──────┬───────┘
       │ 1
       │ prescribed_by
       ▼ *
┌────────────────────┐ *      1 ┌──────────────┐
│ prescriptions      │─────────►│   drugs      │
│ · mode             │          └──────┬───────┘
│ · dose             │                 │ 1
│ · warnings(JSONB)  │                 │
│ · status           │                 ▼ *
└─────────┬──────────┘          ┌──────────────────┐
          │ *                   │ dose_formulas    │
          │                     │ · adult/peds     │
          │                     │ · weight/BSA/etc │
          │                     └──────────────────┘
          ▼ 1
┌──────────────┐                ┌──────────────────────┐
│  patients    │                │ drug_interactions    │
│ · MRN        │                │ (drug_a ↔ drug_b)    │
│ · allergies  │                └──────────────────────┘
│ · meds       │
└──────────────┘
                                ┌──────────────────────┐
                                │ clinical_warnings    │
                                │ (template registry)  │
                                └──────────────────────┘

  ┌──────────────────────────────────────────────────────────┐
  │                       audit_logs                         │
  │  actor, action, entity, diff(JSONB), ip, occurred_at     │
  │  Append-only · Triggered from every mutating controller  │
  └──────────────────────────────────────────────────────────┘
```

## Cardinality summary

| Parent | Child | Cardinality |
| --- | --- | --- |
| roles | users | 1 → * |
| roles | role_permissions | 1 → * |
| permissions | role_permissions | 1 → * |
| drugs | dose_formulas | 1 → * |
| drugs | drug_interactions (a) | 1 → * |
| drugs | drug_interactions (b) | 1 → * |
| drugs | prescriptions | 1 → * |
| patients | prescriptions | 1 → * |
| users | prescriptions | 1 → * |
| any | audit_logs | * → 1 (entity reference is logical) |

See `db/schema.sql` for full DDL.
