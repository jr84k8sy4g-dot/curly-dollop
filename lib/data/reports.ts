import type {
  ReportDefinition,
  ReportKind,
  ReportRecord,
} from "@/lib/types/report-types";

export const REPORT_DEFINITIONS: ReportDefinition[] = [
  {
    kind: "drug_utilization",
    title: "Drug Utilization",
    description:
      "Calculations per drug, route, and category across the selected window.",
    gradient: "bg-gradient-primary shadow-primary",
  },
  {
    kind: "safety_blocks",
    title: "Safety Blocks",
    description: "Allergy and interaction blocks the CDSS prevented at order entry.",
    gradient: "bg-gradient-danger shadow-danger",
  },
  {
    kind: "renal_hepatic",
    title: "Renal & Hepatic Adjustments",
    description: "Every dose modified by eGFR or hepatic impairment, with delta vs. label.",
    gradient: "bg-gradient-info shadow-info",
  },
  {
    kind: "prescription_activity",
    title: "Prescription Activity",
    description: "Signed prescriptions broken down by prescriber and patient.",
    gradient: "bg-gradient-success shadow-success",
  },
  {
    kind: "compliance_summary",
    title: "Compliance Summary",
    description: "HIPAA / SOC 2 audit posture, encryption coverage, and access controls.",
    gradient: "bg-gradient-dark shadow-dark",
  },
];

export const REPORT_TITLES: Record<ReportKind, string> = Object.fromEntries(
  REPORT_DEFINITIONS.map((d) => [d.kind, d.title]),
) as Record<ReportKind, string>;

export const RECENT_REPORTS: ReportRecord[] = [
  {
    id: "RPT-2026-05-W21",
    kind: "drug_utilization",
    title: "Drug Utilization — Week 21",
    range: "2026-05-18 → 2026-05-24",
    generatedAt: "2026-05-25T07:00:00Z",
    generatedBy: "scheduler@cdss",
    format: "csv",
    rows: 1820,
    sizeKb: 184,
    status: "ready",
  },
  {
    id: "RPT-2026-05-22",
    kind: "safety_blocks",
    title: "Safety Blocks — Daily",
    range: "2026-05-22",
    generatedAt: "2026-05-23T00:05:00Z",
    generatedBy: "scheduler@cdss",
    format: "csv",
    rows: 47,
    sizeKb: 12,
    status: "ready",
  },
  {
    id: "RPT-2026-05-MAY",
    kind: "renal_hepatic",
    title: "Renal & Hepatic Adjustments — May to date",
    range: "2026-05-01 → 2026-05-24",
    generatedAt: "2026-05-24T18:42:00Z",
    generatedBy: "Dr. Reynaldo Dizon",
    format: "json",
    rows: 312,
    sizeKb: 96,
    status: "ready",
  },
  {
    id: "RPT-2026-05-RX",
    kind: "prescription_activity",
    title: "Prescription Activity — Anesthesia team",
    range: "2026-05-17 → 2026-05-23",
    generatedAt: "2026-05-24T09:14:00Z",
    generatedBy: "PharmD Jorge Cruz",
    format: "csv",
    rows: 421,
    sizeKb: 51,
    status: "ready",
  },
  {
    id: "RPT-2026-Q2-CMP",
    kind: "compliance_summary",
    title: "Compliance Summary — Q2",
    range: "2026-04-01 → 2026-05-24",
    generatedAt: "2026-05-24T08:00:00Z",
    generatedBy: "Auditor Liu Wei",
    format: "json",
    rows: 1,
    sizeKb: 7,
    status: "ready",
  },
  {
    id: "RPT-2026-05-W20",
    kind: "drug_utilization",
    title: "Drug Utilization — Week 20",
    range: "2026-05-11 → 2026-05-17",
    generatedAt: "2026-05-18T07:00:00Z",
    generatedBy: "scheduler@cdss",
    format: "csv",
    rows: 1764,
    sizeKb: 178,
    status: "ready",
  },
];

export function buildSampleReportPayload(kind: ReportKind, range: string) {
  switch (kind) {
    case "drug_utilization":
      return {
        kind,
        range,
        top: [
          { drug: "Propofol", calculations: 342, alerts: 7 },
          { drug: "Fentanyl", calculations: 281, alerts: 12 },
          { drug: "Vancomycin", calculations: 188, alerts: 24 },
          { drug: "Norepinephrine", calculations: 142, alerts: 9 },
        ],
        totalCalculations: 1820,
      };
    case "safety_blocks":
      return {
        kind,
        range,
        blocks: [
          { type: "allergy", count: 14 },
          { type: "interaction", count: 19 },
          { type: "max_dose", count: 9 },
          { type: "renal_contraindication", count: 5 },
        ],
      };
    case "renal_hepatic":
      return {
        kind,
        range,
        renalAdjustments: 218,
        hepaticAdjustments: 94,
        meanReductionPct: 27.4,
      };
    case "prescription_activity":
      return {
        kind,
        range,
        prescribers: [
          { name: "Dr. Reynaldo Dizon", count: 188 },
          { name: "Dr. Mei Santos", count: 142 },
          { name: "Dr. Aaron Pe", count: 91 },
        ],
      };
    case "compliance_summary":
      return {
        kind,
        range,
        encryptionAtRest: "AES-256",
        encryptionInTransit: "TLS 1.3",
        mfaCoverage: 1,
        rbacRoles: 5,
        auditCoverage: 1,
      };
  }
}
