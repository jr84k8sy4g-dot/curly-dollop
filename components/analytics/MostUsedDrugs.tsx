"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const TOP = [
  { drug: "Propofol", count: 342, category: "Anesthetic", pct: 100 },
  { drug: "Fentanyl", count: 288, category: "Analgesic", pct: 84 },
  { drug: "Rocuronium", count: 214, category: "NMB", pct: 63 },
  { drug: "Ondansetron", count: 198, category: "Antiemetic", pct: 58 },
  { drug: "Vancomycin", count: 154, category: "Antibiotic", pct: 45 },
  { drug: "Norepinephrine", count: 112, category: "Vasopressor", pct: 33 },
  { drug: "Heparin", count: 89, category: "Anticoagulant", pct: 26 },
];

const GRADS = [
  "bg-gradient-primary",
  "bg-gradient-info",
  "bg-gradient-success",
  "bg-gradient-warning",
  "bg-gradient-danger",
  "bg-gradient-dark",
  "bg-gradient-secondary",
];

export function MostUsedDrugs() {
  return (
    <Card title="Most Used Drugs" subtitle="Past 30 days">
      <div className="space-y-4">
        {TOP.map((row, i) => (
          <div key={row.drug}>
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <p className="text-sm font-bold text-dark dark:text-white">
                  {row.drug}
                </p>
                <p className="text-xs text-muted dark:text-white/40">
                  {row.category}
                </p>
              </div>
              <Badge tone="primary">{row.count}</Badge>
            </div>
            <div className="w-full h-1.5 bg-light dark:bg-white/10 rounded-lg overflow-hidden">
              <div
                className={`h-full rounded-lg ${GRADS[i % GRADS.length] ?? "bg-gradient-primary"}`}
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
