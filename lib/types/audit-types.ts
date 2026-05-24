export type AuditAction =
  | "calculate_dose"
  | "create_prescription"
  | "view_patient"
  | "update_patient"
  | "export_report"
  | "login"
  | "logout"
  | "permission_denied"
  | "allergy_block"
  | "interaction_warning"
  | "renal_adjustment"
  | "hepatic_adjustment";

export type AuditSeverity = "info" | "success" | "warning" | "danger";

export type AuditActorRole =
  | "physician"
  | "pharmacist"
  | "nurse"
  | "admin"
  | "auditor";

export interface AuditEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: AuditActorRole;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  patientId?: string;
  severity: AuditSeverity;
  ip: string;
  detail: string;
}

export interface AuditQuery {
  q?: string;
  action?: AuditAction | "";
  role?: AuditActorRole | "";
  severity?: AuditSeverity | "";
}
