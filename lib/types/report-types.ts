export type ReportKind =
  | "drug_utilization"
  | "safety_blocks"
  | "renal_hepatic"
  | "prescription_activity"
  | "compliance_summary";

export type ReportFormat = "csv" | "json";

export type ReportStatus = "ready" | "queued" | "failed";

export interface ReportDefinition {
  kind: ReportKind;
  title: string;
  description: string;
  gradient:
    | "bg-gradient-primary shadow-primary"
    | "bg-gradient-info shadow-info"
    | "bg-gradient-success shadow-success"
    | "bg-gradient-warning shadow-warning"
    | "bg-gradient-danger shadow-danger"
    | "bg-gradient-dark shadow-dark";
}

export interface ReportRecord {
  id: string;
  kind: ReportKind;
  title: string;
  range: string;
  generatedAt: string;
  generatedBy: string;
  format: ReportFormat;
  rows: number;
  sizeKb: number;
  status: ReportStatus;
}

export interface GenerateReportInput {
  kind: ReportKind;
  from: string;
  to: string;
  format: ReportFormat;
}
