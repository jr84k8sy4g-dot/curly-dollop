# User Flow Diagrams

## Primary flow — Calculate and prescribe a dose

```
   ┌──────────────────┐
   │  Clinician logs  │
   │ in (JWT + MFA)   │
   └────────┬─────────┘
            ▼
   ┌──────────────────┐    1. Pick existing patient OR
   │  Open dashboard  │ ─► 2. Enter ad-hoc anthropometrics
   └────────┬─────────┘     (auto BMI/IBW/ABW/BSA)
            ▼
   ┌──────────────────┐
   │  Search drug     │ ─► autocomplete, favorites, recents
   └────────┬─────────┘
            ▼
   ┌──────────────────┐
   │  Choose mode     │     weight · BSA · pediatric · fixed
   │  & enter dose    │     infusion · bolus
   └────────┬─────────┘
            ▼
   ┌──────────────────┐    pure functional engine
   │  Engine runs     │ ─► dose × adjustments × safety
   └────────┬─────────┘
            ▼
   ┌──────────────────┐    ⚠ allergy · interaction
   │  CDS evaluates   │    ⚠ max dose · renal · hepatic
   └────────┬─────────┘
            ▼
   ┌──────────────────┐
   │  Show results +  │
   │  drug monograph  │
   └────────┬─────────┘
            ▼
   ┌──────────────────┐    Print to PDF
   │  Generate report │ ─► Export CSV / JSON
   │  & physician     │ ─► Save as draft prescription
   │  notes           │
   └────────┬─────────┘
            ▼
   ┌──────────────────┐
   │  Sign & dispatch │ ─► pharmacy → nurse admin
   └──────────────────┘
```

## Allergy-block secondary flow

```
   Search "penicillin" ─► Patient has Penicillin allergy ─►
   CDS surfaces CRITICAL alert ─► Clinician must override or
   choose alternative ─► override reason logged to audit_logs
```

## Roles & permissions matrix

| Action | Physician | Pharmacist | Nurse | Admin | Auditor |
| --- | --- | --- | --- | --- | --- |
| View patient | ✓ | ✓ | ✓ | – | ✓ |
| Create / update patient | ✓ | – | – | – | – |
| Calculate dose | ✓ | ✓ | ✓ (view) | – | ✓ (view) |
| Create prescription | ✓ | – | – | – | – |
| Sign prescription | ✓ | – | – | – | – |
| Administer | – | – | ✓ | – | – |
| Manage formulary | – | ✓ | – | – | – |
| Manage users | – | – | – | ✓ | – |
| View audit log | – | – | – | ✓ | ✓ |
