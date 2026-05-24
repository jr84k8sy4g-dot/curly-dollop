"use client";

import { useEffect, useMemo, useState } from "react";
import { Calculator, Beaker, Droplets, Clock, Activity } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { calculateDose } from "@/lib/calc/dose";
import type { CalcInput, CalcMode, CalcResult } from "@/lib/types/calc-types";
import type { Drug, Patient } from "@/lib/types/drug-types";
import { formatNumber } from "@/lib/utils";

interface Props {
  drug: Drug | null;
  patient: Patient;
  onResult: (r: CalcResult | null) => void;
}

const MODE_OPTIONS: { value: CalcMode; label: string }[] = [
  { value: "weight", label: "Weight-based (mg/kg)" },
  { value: "bsa", label: "Body Surface Area (mg/m²)" },
  { value: "pediatric", label: "Pediatric" },
  { value: "fixed", label: "Fixed dose" },
  { value: "infusion", label: "IV infusion" },
  { value: "bolus", label: "Bolus" },
];

export function DoseCalculator({ drug, patient, onResult }: Props) {
  const [mode, setMode] = useState<CalcMode>("weight");
  const [doseValue, setDoseValue] = useState<number>(0);
  const [doseUnit, setDoseUnit] = useState<string>("mg/kg");
  const [concentration, setConcentration] = useState<number>(0);
  const [duration, setDuration] = useState<number>(60);
  const [dropFactor, setDropFactor] = useState<number>(20);

  useEffect(() => {
    if (!drug) return;
    const ped = mode === "pediatric" && drug.pediatricDose;
    const range = ped || drug.adultDose;
    setDoseValue(range.min);
    setDoseUnit(range.unit);
    const concMatch = drug.concentration.match(/(\d+(\.\d+)?)/);
    if (concMatch && concMatch[1]) setConcentration(Number(concMatch[1]));
  }, [drug, mode]);

  const result = useMemo<CalcResult | null>(() => {
    if (!drug || doseValue <= 0) return null;
    const input: CalcInput = {
      drugId: drug.id,
      mode,
      doseValue,
      doseUnit,
      patientWeightKg: patient.weightKg,
      patientBsaM2: patient.bsaM2,
      patientAgeYears: patient.age,
      patientEgfr: patient.egfr,
      patientHepatic: patient.hepaticImpairment,
      concentrationMgPerMl: concentration || undefined,
      durationMinutes: duration,
      dropFactor,
    };
    return calculateDose(drug, patient, input);
  }, [drug, patient, mode, doseValue, doseUnit, concentration, duration, dropFactor]);

  useEffect(() => {
    onResult(result);
  }, [result, onResult]);

  if (!drug) {
    return (
      <Card title="Dose Calculator" subtitle="Select a drug to begin">
        <div className="rounded-xl border border-dashed border-light dark:border-white/10 p-10 text-center">
          <Calculator
            size={28}
            className="mx-auto text-muted dark:text-white/40 mb-2"
          />
          <p className="text-sm text-muted dark:text-white/40">
            No drug selected. Use search to pick a medication.
          </p>
        </div>
      </Card>
    );
  }

  const rangeBadge = (() => {
    const r = mode === "pediatric" && drug.pediatricDose ? drug.pediatricDose : drug.adultDose;
    return `${r.min}–${r.max} ${r.unit}`;
  })();

  return (
    <Card
      title="Dose Calculator"
      subtitle={`${drug.name} · ${drug.concentration}`}
      action={<Badge tone="info">{rangeBadge}</Badge>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Calculation mode"
          value={mode}
          onChange={(e) => setMode(e.target.value as CalcMode)}
          options={MODE_OPTIONS}
        />
        <Select
          label="Route"
          value={drug.defaultRoute}
          onChange={() => undefined}
          options={drug.routes.map((r) => ({ value: r, label: r }))}
        />
        <Input
          type="number"
          step="0.01"
          label={`Dose (${doseUnit})`}
          value={doseValue}
          onChange={(e) => setDoseValue(Number(e.target.value))}
          hint={`Recommended range: ${rangeBadge}`}
        />
        <Input
          type="number"
          step="0.1"
          label="Concentration (mg/mL)"
          value={concentration}
          onChange={(e) => setConcentration(Number(e.target.value))}
        />

        {(mode === "infusion") && (
          <>
            <Input
              type="number"
              label="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
            <Input
              type="number"
              label="Drop factor (gtts/mL)"
              value={dropFactor}
              onChange={(e) => setDropFactor(Number(e.target.value))}
              hint="Macro 10/15/20 · Micro 60"
            />
          </>
        )}
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <ResultTile
            icon={<Calculator size={18} />}
            label="Total Dose"
            value={`${formatNumber(result.totalDoseMg)} mg`}
            tone="primary"
          />
          {result.volumeMl !== undefined && (
            <ResultTile
              icon={<Beaker size={18} />}
              label="Volume"
              value={`${formatNumber(result.volumeMl)} mL`}
              tone="info"
            />
          )}
          {result.infusionRateMlHr !== undefined && (
            <ResultTile
              icon={<Activity size={18} />}
              label="Infusion Rate"
              value={`${formatNumber(result.infusionRateMlHr)} mL/hr`}
              tone="success"
            />
          )}
          {result.dropsPerMinute !== undefined && (
            <ResultTile
              icon={<Droplets size={18} />}
              label="Drops"
              value={`${formatNumber(result.dropsPerMinute)} gtts/min`}
              tone="warning"
            />
          )}
          {result.durationMinutes && (
            <ResultTile
              icon={<Clock size={18} />}
              label="Duration"
              value={`${result.durationMinutes} min`}
              tone="dark"
            />
          )}
        </div>
      )}

      {result?.notes && result.notes.length > 0 && (
        <div className="mt-4 rounded-xl bg-page dark:bg-white/5 p-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted dark:text-white/40 mb-2">
            Calculation steps
          </p>
          <ul className="space-y-1">
            {result.notes.map((n, i) => (
              <li key={i} className="text-sm text-body dark:text-white/80">
                · {n}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <Button variant="primary" size="md">
          Save Prescription
        </Button>
        <Button variant="outline" size="md" onClick={() => window.print()}>
          Print Report
        </Button>
      </div>
    </Card>
  );
}

function ResultTile({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "primary" | "info" | "success" | "warning" | "dark";
}) {
  const grad = {
    primary: "bg-gradient-primary shadow-primary",
    info: "bg-gradient-info shadow-info",
    success: "bg-gradient-success shadow-success",
    warning: "bg-gradient-warning shadow-warning",
    dark: "bg-gradient-dark shadow-dark",
  }[tone];
  return (
    <div className={`rounded-xl text-white p-4 ${grad}`}>
      <div className="flex items-center justify-between mb-2">
        {icon}
      </div>
      <p className="text-[0.65rem] font-bold uppercase tracking-wide text-white/80">
        {label}
      </p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}
