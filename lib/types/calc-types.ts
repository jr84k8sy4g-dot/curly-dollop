import type { Route } from "./drug-types";

export type CalcMode =
  | "weight"
  | "bsa"
  | "pediatric"
  | "fixed"
  | "infusion"
  | "bolus";

export interface CalcInput {
  drugId: string;
  mode: CalcMode;
  doseValue: number;
  doseUnit: string;
  patientWeightKg: number;
  patientBsaM2?: number;
  patientAgeYears?: number;
  patientEgfr?: number;
  patientHepatic?: "none" | "mild" | "moderate" | "severe";
  route?: Route;
  concentrationMgPerMl?: number;
  durationMinutes?: number;
  dropFactor?: number;
}

export interface CalcResult {
  totalDoseMg: number;
  totalDoseDisplay: string;
  volumeMl?: number;
  infusionRateMlHr?: number;
  dropsPerMinute?: number;
  durationMinutes?: number;
  warnings: ClinicalWarning[];
  notes: string[];
  adjustmentApplied?: {
    renal?: number;
    hepatic?: number;
  };
}

export type WarningSeverity = "info" | "warning" | "critical";

export interface ClinicalWarning {
  severity: WarningSeverity;
  code: string;
  title: string;
  message: string;
}
