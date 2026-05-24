# Wireframes

Wireframes describe screen composition for the three primary pages.
Visual fidelity follows the Soft UI design system in `skills/05-ui/`.

## 1. Clinical Workspace (`/dashboard`)

```
┌──────────────┬─────────────────────────────────────────────────────────────┐
│              │  ┌───── Topbar (search · theme · alerts · profile) ──────┐ │
│              │  └────────────────────────────────────────────────────────┘ │
│   Sidebar    │                                                              │
│              │  ┌──── Patient Panel ────┐   ┌────── Drug Search ────────┐ │
│  · Dashboard │  │ ID Name Weight Height │   │ 🔍 ____________  Category │ │
│  · Patients  │  │ Age Sex eGFR Hepatic  │   │ ★ Favorites  ⏱ Recents    │ │
│  · Drugs     │  │ [BMI][IBW][ABW][BSA]  │   │ • Result • Result • Result│ │
│  · Analytics │  │ Allergies · Conditions│   └────────────────────────────┘ │
│  · Reports   │  │ Current meds          │                                  │
│  · Audit     │  └───────────────────────┘                                  │
│  · Settings  │                                                              │
│              │  ┌──── Drug Monograph ───┐   ┌──── Dose Calculator ──────┐ │
│              │  │ Mechanism / Indic.    │   │ Mode · Dose · Conc · Time │ │
│   HIPAA      │  │ Contra / Warnings     │   │ [Total][Vol][Rate][gtts]  │ │
│   compliance │  │ Interactions / Mon.   │   │ Calculation steps         │ │
│   card       │  │ Renal/Hepatic boxes   │   │ Save · Print              │ │
│              │  │ References            │   └────────────────────────────┘ │
│              │  └───────────────────────┘                                  │
│              │                                                              │
│              │  ┌──── Clinical Alerts (Allergy · Interaction · MaxDose) ─┐ │
│              │  └────────────────────────────────────────────────────────┘ │
│              │                                                              │
│              │  ┌──── Patient Dose Report ─────────────────────────────┐ │
│              │  │ Patient · Drug · Big number · steps · alerts · notes  │ │
│              │  │ [Print PDF] [Export CSV] [Export JSON]                │ │
│              │  └────────────────────────────────────────────────────────┘ │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

## 2. Analytics (`/analytics`)

```
┌──────────────┬─────────────────────────────────────────────────────────────┐
│              │  [StatCard][StatCard][StatCard][StatCard]                   │
│              │                                                              │
│   Sidebar    │  ┌── Drug Utilization (Area chart) ──┐   ┌── Most Used ──┐ │
│              │  │ Calculations vs alerts · weekly   │   │ Drug · count   │ │
│              │  └────────────────────────────────────┘   └────────────────┘ │
│              │                                                              │
│              │  ┌── Recent Activity (Timeline) ─────┐   ┌── Compliance ─┐ │
│              │  │ • Renal adjust • Allergy block… │    │ 100% audit cov │ │
│              │  └────────────────────────────────────┘   └────────────────┘ │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

## 3. Drug Library (`/drugs`)

```
┌──────────────┬─────────────────────────────────────────────────────────────┐
│              │  Search ____________________  Category ____________         │
│              │                                                              │
│   Sidebar    │  ┌── Card ─┐ ┌── Card ─┐ ┌── Card ─┐ ┌── Card ─┐            │
│              │  │ Name    │ │ Name    │ │ Name    │ │ Name    │  …         │
│              │  │ Generic │ │ Generic │ │ Generic │ │ Generic │            │
│              │  │ Doses   │ │ Doses   │ │ Doses   │ │ Doses   │            │
│              │  │ Routes  │ │ Routes  │ │ Routes  │ │ Routes  │            │
│              │  └─────────┘ └─────────┘ └─────────┘ └─────────┘            │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

## Responsive behavior

| Breakpoint | Layout |
| --- | --- |
| `<640px`  | Single column, sidebar as overlay, sticky topbar |
| `640–1024` | Two-column patient panel, one-column for results |
| `>1024px` | 12-col grid: Patient + monograph (4) · Workspace (8) |
