import { NextRequest, NextResponse } from "next/server";
import { DRUGS, searchDrugs } from "@/lib/data/drugs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? "";
  const category = url.searchParams.get("category") ?? undefined;
  const list = q || category ? searchDrugs(q, category) : DRUGS;
  return NextResponse.json({
    total: list.length,
    drugs: list.map(({ name, id, genericName, category, defaultRoute, concentration }) => ({
      id,
      name,
      genericName,
      category,
      defaultRoute,
      concentration,
    })),
  });
}
