import { NextRequest, NextResponse } from "next/server";
import { findDrug } from "@/lib/data/drugs";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const drug = findDrug(params.id);
  if (!drug) {
    return NextResponse.json({ error: "drug_not_found" }, { status: 404 });
  }
  return NextResponse.json(drug);
}
