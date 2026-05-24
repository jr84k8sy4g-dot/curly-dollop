"use client";

import { useState, useMemo } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DRUGS, DRUG_CATEGORIES, searchDrugs } from "@/lib/data/drugs";

export default function DrugsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const list = useMemo(() => searchDrugs(q, cat || undefined), [q, cat]);

  return (
    <AppShell title="Drug Library" breadcrumb="CDSS · Master Formulary">
      <Card
        title={`${DRUGS.length} drugs · ${DRUG_CATEGORIES.length} classes`}
        subtitle="Curated formulary with anesthesia, critical-care, and ward agents"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <div className="md:col-span-2">
            <Input
              placeholder="Search by name, generic, or brand…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            options={[
              { value: "", label: "All categories" },
              ...DRUG_CATEGORIES.map((c) => ({ value: c, label: c })),
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((d) => (
            <div
              key={d.id}
              className="rounded-2xl border border-light dark:border-white/10 p-4 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h6 className="text-base font-bold text-dark dark:text-white leading-tight">
                  {d.name}
                </h6>
                <Badge tone="info">{d.category}</Badge>
              </div>
              <p className="text-xs text-muted dark:text-white/40 mb-3">
                {d.genericName} · {d.concentration}
              </p>
              <div className="space-y-1.5 text-xs text-body dark:text-white/80">
                <p>
                  <span className="font-bold">Adult:</span> {d.adultDose.min}–
                  {d.adultDose.max} {d.adultDose.unit}
                </p>
                {d.pediatricDose && (
                  <p>
                    <span className="font-bold">Pediatric:</span>{" "}
                    {d.pediatricDose.min}–{d.pediatricDose.max}{" "}
                    {d.pediatricDose.unit}
                  </p>
                )}
                <p>
                  <span className="font-bold">Route:</span> {d.routes.join(", ")}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                <Badge tone="dark">{d.defaultRoute}</Badge>
                {d.maxSingleDose && (
                  <Badge tone="warning">
                    Max {d.maxSingleDose.value} {d.maxSingleDose.unit}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        {list.length === 0 && (
          <p className="text-center text-sm text-muted dark:text-white/40 py-10">
            No drugs match the current filter.
          </p>
        )}
      </Card>
    </AppShell>
  );
}
