import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findDrug } from "@/lib/data/drugs";
import { findPatient } from "@/lib/data/patients";
import { calculateDose } from "@/lib/calc/dose";

const schema = z.object({
  drugId: z.string(),
  patientId: z.string().optional(),
  patient: z
    .object({
      weightKg: z.number().positive(),
      bsaM2: z.number().optional(),
      age: z.number().int().nonnegative(),
      gender: z.enum(["male", "female"]),
      egfr: z.number().optional(),
      hepaticImpairment: z
        .enum(["none", "mild", "moderate", "severe"])
        .optional(),
      allergies: z.array(z.string()).default([]),
      conditions: z.array(z.string()).default([]),
      currentMedications: z.array(z.string()).default([]),
    })
    .optional(),
  mode: z.enum([
    "weight",
    "bsa",
    "pediatric",
    "fixed",
    "infusion",
    "bolus",
  ]),
  doseValue: z.number().positive(),
  doseUnit: z.string(),
  concentrationMgPerMl: z.number().positive().optional(),
  durationMinutes: z.number().positive().optional(),
  dropFactor: z.number().positive().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const drug = findDrug(parsed.data.drugId);
  if (!drug) {
    return NextResponse.json({ error: "drug_not_found" }, { status: 404 });
  }

  let patient = parsed.data.patientId ? findPatient(parsed.data.patientId) : undefined;
  if (!patient && parsed.data.patient) {
    patient = {
      id: "ad-hoc",
      name: "Ad-hoc",
      heightCm: 170,
      ...parsed.data.patient,
    };
  }
  if (!patient) {
    return NextResponse.json({ error: "patient_required" }, { status: 400 });
  }

  const result = calculateDose(drug, patient, {
    drugId: drug.id,
    mode: parsed.data.mode,
    doseValue: parsed.data.doseValue,
    doseUnit: parsed.data.doseUnit,
    patientWeightKg: patient.weightKg,
    patientBsaM2: patient.bsaM2,
    patientAgeYears: patient.age,
    patientEgfr: patient.egfr,
    patientHepatic: patient.hepaticImpairment,
    concentrationMgPerMl: parsed.data.concentrationMgPerMl,
    durationMinutes: parsed.data.durationMinutes,
    dropFactor: parsed.data.dropFactor,
  });

  return NextResponse.json({ drug: drug.id, patient: patient.id, result });
}
