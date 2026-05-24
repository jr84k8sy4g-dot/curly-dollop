import type {
  CalcInput,
  CalcResult,
  ClinicalWarning,
} from "../types/calc-types";
import type { Drug, Patient } from "../types/drug-types";
import { roundTo } from "./patient";

const DEFAULT_DROP_FACTOR = 20;

export function calculateDose(
  drug: Drug,
  patient: Patient,
  input: CalcInput,
): CalcResult {
  const warnings: ClinicalWarning[] = [];
  const notes: string[] = [];

  let totalDoseMg = 0;
  let renalReduction = 0;
  let hepaticReduction = 0;

  switch (input.mode) {
    case "weight":
    case "bolus":
      totalDoseMg = input.doseValue * input.patientWeightKg;
      notes.push(
        `Weight-based: ${input.doseValue} ${input.doseUnit} × ${input.patientWeightKg} kg`,
      );
      break;
    case "bsa":
      if (!input.patientBsaM2 || input.patientBsaM2 <= 0) {
        warnings.push(critical("BSA_REQUIRED", "BSA required", "Cannot calculate BSA-based dose without valid BSA."));
        return { totalDoseMg: 0, totalDoseDisplay: "—", warnings, notes };
      }
      totalDoseMg = input.doseValue * input.patientBsaM2;
      notes.push(
        `BSA-based: ${input.doseValue} ${input.doseUnit} × ${input.patientBsaM2} m²`,
      );
      break;
    case "pediatric": {
      const pedMin = drug.pediatricDose?.min ?? drug.adultDose.min;
      const pedMax = drug.pediatricDose?.max ?? drug.adultDose.max;
      if (input.doseValue < pedMin) {
        warnings.push(
          warning(
            "PED_UNDER",
            "Below pediatric minimum",
            `Selected dose is below the pediatric minimum (${pedMin} ${drug.pediatricDose?.unit ?? drug.adultDose.unit}).`,
          ),
        );
      }
      if (input.doseValue > pedMax) {
        warnings.push(
          critical(
            "PED_OVER",
            "Exceeds pediatric maximum",
            `Selected dose exceeds the pediatric maximum (${pedMax} ${drug.pediatricDose?.unit ?? drug.adultDose.unit}).`,
          ),
        );
      }
      totalDoseMg = input.doseValue * input.patientWeightKg;
      notes.push(
        `Pediatric weight-based: ${input.doseValue} ${input.doseUnit} × ${input.patientWeightKg} kg`,
      );
      break;
    }
    case "fixed":
      totalDoseMg = input.doseValue;
      notes.push(`Fixed dose: ${input.doseValue} ${input.doseUnit}`);
      break;
    case "infusion":
      totalDoseMg = input.doseValue;
      notes.push(`Infusion target dose: ${input.doseValue} ${input.doseUnit}`);
      break;
  }

  if (
    drug.renalAdjustment &&
    input.patientEgfr !== undefined &&
    input.patientEgfr < drug.renalAdjustment.threshold
  ) {
    renalReduction = drug.renalAdjustment.reduction;
    const before = totalDoseMg;
    totalDoseMg = totalDoseMg * (1 - renalReduction);
    warnings.push(
      warning(
        "RENAL_ADJ",
        "Renal dose adjustment applied",
        `eGFR ${input.patientEgfr} < ${drug.renalAdjustment.threshold} mL/min/1.73m². Dose reduced by ${Math.round(renalReduction * 100)}%. (${before.toFixed(1)} → ${totalDoseMg.toFixed(1)} mg). ${drug.renalAdjustment.note}`,
      ),
    );
  }

  if (
    drug.hepaticAdjustment &&
    input.patientHepatic &&
    input.patientHepatic !== "none"
  ) {
    const map = { mild: 0.5, moderate: 1, severe: 1.25 };
    const sev = map[input.patientHepatic] ?? 1;
    hepaticReduction = Math.min(drug.hepaticAdjustment.reduction * sev, 0.75);
    const before = totalDoseMg;
    totalDoseMg = totalDoseMg * (1 - hepaticReduction);
    warnings.push(
      warning(
        "HEPATIC_ADJ",
        "Hepatic dose adjustment applied",
        `${input.patientHepatic} hepatic impairment. Dose reduced by ${Math.round(hepaticReduction * 100)}% (${before.toFixed(1)} → ${totalDoseMg.toFixed(1)} mg). ${drug.hepaticAdjustment.note}`,
      ),
    );
  }

  if (drug.maxSingleDose && totalDoseMg > drug.maxSingleDose.value) {
    warnings.push(
      critical(
        "MAX_DOSE",
        "Dose exceeds maximum recommended dose",
        `Calculated ${roundTo(totalDoseMg, 1)} ${drug.maxSingleDose.unit} exceeds maximum single dose ${drug.maxSingleDose.value} ${drug.maxSingleDose.unit}.`,
      ),
    );
  }

  for (const allergy of patient.allergies) {
    if (
      drug.name.toLowerCase().includes(allergy.toLowerCase()) ||
      drug.genericName.toLowerCase().includes(allergy.toLowerCase()) ||
      drug.brandNames.some((b) =>
        b.toLowerCase().includes(allergy.toLowerCase()),
      )
    ) {
      warnings.push(
        critical(
          "ALLERGY",
          "Allergy alert",
          `Patient reports allergy: ${allergy}. ${drug.name} may trigger reaction.`,
        ),
      );
    }
  }

  for (const med of patient.currentMedications) {
    if (
      drug.interactions.some((i) =>
        i.toLowerCase().includes(med.toLowerCase()),
      )
    ) {
      warnings.push(
        warning(
          "INTERACTION",
          "Drug interaction",
          `${drug.name} interacts with ${med}.`,
        ),
      );
    }
  }

  let volumeMl: number | undefined;
  let infusionRateMlHr: number | undefined;
  let dropsPerMinute: number | undefined;

  if (input.concentrationMgPerMl && input.concentrationMgPerMl > 0) {
    volumeMl = roundTo(totalDoseMg / input.concentrationMgPerMl, 2);
    if (input.mode === "infusion" && input.durationMinutes && input.durationMinutes > 0) {
      infusionRateMlHr = roundTo((volumeMl * 60) / input.durationMinutes, 2);
      const dropFactor = input.dropFactor ?? DEFAULT_DROP_FACTOR;
      dropsPerMinute = roundTo((volumeMl * dropFactor) / input.durationMinutes, 1);
    }
  }

  return {
    totalDoseMg: roundTo(totalDoseMg, 2),
    totalDoseDisplay: `${roundTo(totalDoseMg, 2)} mg`,
    volumeMl,
    infusionRateMlHr,
    dropsPerMinute,
    durationMinutes: input.durationMinutes,
    warnings,
    notes,
    adjustmentApplied: {
      renal: renalReduction || undefined,
      hepatic: hepaticReduction || undefined,
    },
  };
}

function warning(code: string, title: string, message: string): ClinicalWarning {
  return { severity: "warning", code, title, message };
}
function critical(code: string, title: string, message: string): ClinicalWarning {
  return { severity: "critical", code, title, message };
}
