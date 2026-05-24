"use client";

import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import type { ClinicalWarning } from "@/lib/types/calc-types";

export function ClinicalAlerts({ warnings }: { warnings: ClinicalWarning[] }) {
  if (warnings.length === 0) {
    return (
      <Card title="Clinical Decision Support" subtitle="Live safety checks">
        <div className="rounded-xl bg-gradient-success shadow-success p-5 text-white flex items-center gap-3">
          <ShieldCheck size={22} />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide">
              No safety alerts
            </p>
            <p className="text-sm text-white/90 mt-0.5">
              Dose, allergies, interactions, and organ adjustments are within
              guidelines.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const sorted = [...warnings].sort((a, b) => order(a.severity) - order(b.severity));

  return (
    <Card
      title="Clinical Decision Support"
      subtitle={`${warnings.length} active alert${warnings.length === 1 ? "" : "s"}`}
    >
      <div className="space-y-3">
        {sorted.map((w, i) => (
          <Alert key={`${w.code}-${i}`} w={w} />
        ))}
      </div>
    </Card>
  );
}

function order(s: ClinicalWarning["severity"]): number {
  switch (s) {
    case "critical":
      return 0;
    case "warning":
      return 1;
    case "info":
      return 2;
  }
}
