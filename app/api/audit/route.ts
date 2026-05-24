import { NextRequest, NextResponse } from "next/server";
import { AUDIT_LOG, filterAudit } from "@/lib/data/audit";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rows = filterAudit(
    AUDIT_LOG,
    searchParams.get("q") ?? "",
    searchParams.get("action") ?? "",
    searchParams.get("role") ?? "",
    searchParams.get("severity") ?? "",
  );
  return NextResponse.json({ total: rows.length, entries: rows });
}
