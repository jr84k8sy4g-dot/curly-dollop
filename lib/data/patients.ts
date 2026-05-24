import type { Patient } from "../types/drug-types";
import { calcBMI, calcIBW, calcABW, calcBSA } from "../calc/patient";

function hydrate(p: Omit<Patient, "bmi" | "ibwKg" | "abwKg" | "bsaM2">): Patient {
  const ibw = calcIBW(p.heightCm, p.gender);
  return {
    ...p,
    bmi: calcBMI(p.weightKg, p.heightCm),
    ibwKg: ibw,
    abwKg: calcABW(p.weightKg, ibw),
    bsaM2: calcBSA(p.weightKg, p.heightCm),
  };
}

export const PATIENTS: Patient[] = [
  hydrate({
    id: "P-1001",
    name: "Maria Santos",
    weightKg: 62,
    heightCm: 160,
    age: 47,
    gender: "female",
    egfr: 88,
    hepaticImpairment: "none",
    allergies: ["Penicillin"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    currentMedications: ["Warfarin", "Metformin"],
  }),
  hydrate({
    id: "P-1002",
    name: "Juan Dela Cruz",
    weightKg: 84,
    heightCm: 175,
    age: 62,
    gender: "male",
    egfr: 42,
    hepaticImpairment: "mild",
    allergies: [],
    conditions: ["CKD Stage 3", "Atrial Fibrillation"],
    currentMedications: ["Amiodarone", "Apixaban"],
  }),
  hydrate({
    id: "P-1003",
    name: "Ava Reyes",
    weightKg: 18,
    heightCm: 108,
    age: 6,
    gender: "female",
    egfr: 110,
    hepaticImpairment: "none",
    allergies: ["Sulfa"],
    conditions: ["Asthma"],
    currentMedications: [],
  }),
  hydrate({
    id: "P-1004",
    name: "Liam Tan",
    weightKg: 110,
    heightCm: 182,
    age: 38,
    gender: "male",
    egfr: 95,
    hepaticImpairment: "none",
    allergies: [],
    conditions: ["Obesity (BMI 33)"],
    currentMedications: [],
  }),
];

export function findPatient(id: string): Patient | undefined {
  return PATIENTS.find((p) => p.id === id);
}
