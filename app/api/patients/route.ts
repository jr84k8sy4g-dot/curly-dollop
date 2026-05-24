import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PATIENTS } from "@/lib/data/patients";

const newPatient = z.object({
  name: z.string().min(2),
  weightKg: z.number().positive(),
  heightCm: z.number().positive(),
  age: z.number().int().nonnegative(),
  gender: z.enum(["male", "female"]),
  egfr: z.number().optional(),
  hepaticImpairment: z
    .enum(["none", "mild", "moderate", "severe"])
    .optional(),
  allergies: z.array(z.string()).default([]),
  conditions: z.array(z.string()).default([]),
  currentMedications: z.array(z.string()).default([]),
});

export async function GET() {
  return NextResponse.json({ total: PATIENTS.length, patients: PATIENTS });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = newPatient.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const id = `P-${1000 + PATIENTS.length + 1}`;
  return NextResponse.json({ id, ...parsed.data }, { status: 201 });
}
