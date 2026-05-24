import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    calculationsPerDay: 132,
    patientsTreated: 84,
    alertsTriggered: 83,
    mostUsedDrugs: [
      { drug: "Propofol", count: 342 },
      { drug: "Fentanyl", count: 288 },
      { drug: "Rocuronium", count: 214 },
      { drug: "Ondansetron", count: 198 },
      { drug: "Vancomycin", count: 154 },
    ],
    week: [
      { day: "Mon", calcs: 64, alerts: 8 },
      { day: "Tue", calcs: 92, alerts: 14 },
      { day: "Wed", calcs: 81, alerts: 11 },
      { day: "Thu", calcs: 110, alerts: 19 },
      { day: "Fri", calcs: 132, alerts: 21 },
      { day: "Sat", calcs: 68, alerts: 6 },
      { day: "Sun", calcs: 51, alerts: 4 },
    ],
  });
}
