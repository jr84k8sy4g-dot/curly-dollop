import { describe, it, expect } from "vitest";
import { calculateDose } from "@/lib/calc/dose";
import { findDrug } from "@/lib/data/drugs";
import { findPatient } from "@/lib/data/patients";

describe("dose calculation engine", () => {
  it("computes weight-based propofol induction", () => {
    const drug = findDrug("propofol")!;
    const patient = findPatient("P-1001")!;
    const res = calculateDose(drug, patient, {
      drugId: drug.id,
      mode: "weight",
      doseValue: 2,
      doseUnit: "mg/kg",
      patientWeightKg: patient.weightKg,
    });
    expect(res.totalDoseMg).toBe(124);
  });

  it("flags max-dose exceeded for propofol", () => {
    const drug = findDrug("propofol")!;
    const patient = findPatient("P-1004")!;
    const res = calculateDose(drug, patient, {
      drugId: drug.id,
      mode: "weight",
      doseValue: 3,
      doseUnit: "mg/kg",
      patientWeightKg: 110,
    });
    expect(res.totalDoseMg).toBeGreaterThan(250);
    expect(res.warnings.some((w) => w.code === "MAX_DOSE")).toBe(true);
  });

  it("flags allergy alert when patient is allergic", () => {
    const drug = findDrug("ceftriaxone")!;
    const patient = findPatient("P-1001")!; // allergic to Penicillin
    const res = calculateDose(
      { ...drug, name: "Penicillin", genericName: "penicillin g" },
      patient,
      {
        drugId: drug.id,
        mode: "fixed",
        doseValue: 1000,
        doseUnit: "mg",
        patientWeightKg: patient.weightKg,
      },
    );
    expect(res.warnings.some((w) => w.code === "ALLERGY")).toBe(true);
  });

  it("applies renal adjustment for vancomycin when eGFR < threshold", () => {
    const drug = findDrug("vancomycin")!;
    const patient = findPatient("P-1002")!; // eGFR 42
    const res = calculateDose(drug, patient, {
      drugId: drug.id,
      mode: "weight",
      doseValue: 15,
      doseUnit: "mg/kg",
      patientWeightKg: 84,
      patientEgfr: 42,
    });
    expect(res.adjustmentApplied?.renal).toBe(0.5);
    expect(res.totalDoseMg).toBeCloseTo(630, 0); // 15 * 84 = 1260 * 0.5
  });

  it("calculates infusion volume and rate", () => {
    const drug = findDrug("propofol")!;
    const patient = findPatient("P-1001")!;
    const res = calculateDose(drug, patient, {
      drugId: drug.id,
      mode: "infusion",
      doseValue: 600, // mg over the duration
      doseUnit: "mg",
      patientWeightKg: patient.weightKg,
      concentrationMgPerMl: 10,
      durationMinutes: 60,
      dropFactor: 20,
    });
    expect(res.volumeMl).toBe(60);
    expect(res.infusionRateMlHr).toBe(60); // 60 mL / 60 min * 60 = 60 mL/hr
    expect(res.dropsPerMinute).toBe(20);
  });

  it("detects drug interactions", () => {
    const drug = findDrug("fentanyl")!;
    const patient = findPatient("P-1001")!;
    const patientWithMAOI = {
      ...patient,
      currentMedications: ["MAOIs"],
    };
    const res = calculateDose(drug, patientWithMAOI, {
      drugId: drug.id,
      mode: "weight",
      doseValue: 2,
      doseUnit: "mcg/kg",
      patientWeightKg: patient.weightKg,
    });
    expect(res.warnings.some((w) => w.code === "INTERACTION")).toBe(true);
  });
});
