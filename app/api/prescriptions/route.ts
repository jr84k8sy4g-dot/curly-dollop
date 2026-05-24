import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const STORE: Record<string, unknown> = {};

const schema = z.object({
  patientId: z.string(),
  drugId: z.string(),
  totalDoseMg: z.number().positive(),
  route: z.string(),
  durationMinutes: z.number().optional(),
  physicianNotes: z.string().optional(),
  signedBy: z.string(),
});

export async function GET() {
  return NextResponse.json({
    total: Object.keys(STORE).length,
    prescriptions: Object.values(STORE),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const id = `RX-${Date.now()}`;
  const record = { id, ...parsed.data, createdAt: new Date().toISOString() };
  STORE[id] = record;
  return NextResponse.json(record, { status: 201 });
}
