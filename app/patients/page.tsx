"use client";

import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PATIENTS } from "@/lib/data/patients";
import { ArrowUpRight } from "lucide-react";

export default function PatientsPage() {
  return (
    <AppShell title="Patients" breadcrumb="CDSS · Patient Registry">
      <Card title="Patient Registry" subtitle={`${PATIENTS.length} active records`}>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full">
            <thead>
              <tr>
                {["ID", "Name", "Age / Sex", "Weight", "BMI", "eGFR", "Allergies", ""].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[0.65rem] font-bold uppercase tracking-wide text-body dark:text-white/40 pb-3 px-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PATIENTS.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-light dark:border-white/10 last:border-0"
                >
                  <td className="py-3 px-3 text-sm text-body dark:text-white/80 font-mono">
                    {p.id}
                  </td>
                  <td className="py-3 px-3">
                    <p className="text-sm font-bold text-dark dark:text-white">
                      {p.name}
                    </p>
                  </td>
                  <td className="py-3 px-3 text-sm text-body dark:text-white/80">
                    {p.age}y · {p.gender}
                  </td>
                  <td className="py-3 px-3 text-sm text-body dark:text-white/80">
                    {p.weightKg} kg
                  </td>
                  <td className="py-3 px-3 text-sm text-body dark:text-white/80">
                    {p.bmi}
                  </td>
                  <td className="py-3 px-3 text-sm text-body dark:text-white/80">
                    {p.egfr ?? "—"}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1">
                      {p.allergies.length === 0 ? (
                        <Badge tone="dark">none</Badge>
                      ) : (
                        p.allergies.map((a) => (
                          <Badge key={a} tone="danger">
                            {a}
                          </Badge>
                        ))
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link href="/dashboard">
                      <Button
                        variant="outline"
                        size="sm"
                        trailingIcon={<ArrowUpRight size={12} />}
                      >
                        Open
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
