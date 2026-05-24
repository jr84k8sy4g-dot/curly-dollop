import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  format: z.enum(["csv", "json"]),
  payload: z.record(z.unknown()),
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
  if (parsed.data.format === "json") {
    return NextResponse.json(parsed.data.payload, {
      headers: { "Content-Disposition": `attachment; filename=report.json` },
    });
  }
  const rows = Object.entries(parsed.data.payload).map(([k, v]) => [
    k,
    String(v),
  ]);
  const csv = ["field,value", ...rows.map((r) => r.join(","))].join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=report.csv`,
    },
  });
}
