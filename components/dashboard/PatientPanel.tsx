"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { calcBMI, calcIBW, calcABW, calcBSA } from "@/lib/calc/patient";
import type { Patient } from "@/lib/types/drug-types";
import { UserRound } from "lucide-react";

interface Props {
  patient: Patient;
  onChange: (p: Patient) => void;
}

export function PatientPanel({ patient, onChange }: Props) {
  const derived = useMemo(() => {
    const bmi = calcBMI(patient.weightKg, patient.heightCm);
    const ibw = calcIBW(patient.heightCm, patient.gender);
    const abw = calcABW(patient.weightKg, ibw);
    const bsa = calcBSA(patient.weightKg, patient.heightCm);
    return { bmi, ibw, abw, bsa };
  }, [patient.weightKg, patient.heightCm, patient.gender]);

  function set<K extends keyof Patient>(key: K, val: Patient[K]) {
    onChange({ ...patient, [key]: val });
  }

  const setNum = (k: "weightKg" | "heightCm" | "age" | "egfr") => (e: React.ChangeEvent<HTMLInputElement>) =>
    set(k, Number(e.target.value) as Patient[typeof k]);

  return (
    <Card
      title="Patient"
      subtitle="Anthropometrics auto-update calculations"
      action={
        <span className="flex items-center gap-2 text-xs font-bold text-body dark:text-white/60 uppercase tracking-wide">
          <UserRound size={14} />
          {patient.id}
        </span>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Patient ID"
          value={patient.id}
          onChange={(e) => set("id", e.target.value)}
        />
        <Input
          label="Patient Name"
          value={patient.name}
          onChange={(e) => set("name", e.target.value)}
        />
        <Input
          type="number"
          label="Weight (kg)"
          value={patient.weightKg}
          onChange={setNum("weightKg")}
        />
        <Input
          type="number"
          label="Height (cm)"
          value={patient.heightCm}
          onChange={setNum("heightCm")}
        />
        <Input
          type="number"
          label="Age (years)"
          value={patient.age}
          onChange={setNum("age")}
        />
        <Select
          label="Gender"
          value={patient.gender}
          onChange={(e) => set("gender", e.target.value as Patient["gender"])}
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
          ]}
        />
        <Input
          type="number"
          label="eGFR (mL/min/1.73m²)"
          value={patient.egfr ?? ""}
          onChange={setNum("egfr")}
          hint="Used for renal dose adjustment"
        />
        <Select
          label="Hepatic impairment"
          value={patient.hepaticImpairment ?? "none"}
          onChange={(e) =>
            set(
              "hepaticImpairment",
              e.target.value as Patient["hepaticImpairment"],
            )
          }
          options={[
            { value: "none", label: "None" },
            { value: "mild", label: "Mild (Child-Pugh A)" },
            { value: "moderate", label: "Moderate (Child-Pugh B)" },
            { value: "severe", label: "Severe (Child-Pugh C)" },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <DerivedTile label="BMI" value={derived.bmi} unit="kg/m²" tone="info" />
        <DerivedTile label="IBW" value={derived.ibw} unit="kg" tone="info" />
        <DerivedTile label="ABW" value={derived.abw} unit="kg" tone="info" />
        <DerivedTile label="BSA" value={derived.bsa} unit="m²" tone="info" />
      </div>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wide text-dark dark:text-white mb-2">
          Allergies
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {patient.allergies.length === 0 ? (
            <Badge tone="dark">No known allergies</Badge>
          ) : (
            patient.allergies.map((a) => (
              <Badge key={a} tone="danger">
                {a}
              </Badge>
            ))
          )}
        </div>
        <Input
          placeholder="Add allergy and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const v = (e.currentTarget.value || "").trim();
              if (v) {
                set("allergies", [...patient.allergies, v]);
                e.currentTarget.value = "";
              }
            }
          }}
        />
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-wide text-dark dark:text-white mb-2">
          Medical conditions
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {patient.conditions.length === 0 ? (
            <Badge tone="dark">None recorded</Badge>
          ) : (
            patient.conditions.map((c) => (
              <Badge key={c} tone="warning">
                {c}
              </Badge>
            ))
          )}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-dark dark:text-white mb-2">
          Current medications
        </p>
        <div className="flex flex-wrap gap-2">
          {patient.currentMedications.length === 0 ? (
            <Badge tone="dark">None</Badge>
          ) : (
            patient.currentMedications.map((m) => (
              <Badge key={m} tone="primary">
                {m}
              </Badge>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}

function DerivedTile({
  label,
  value,
  unit,
  tone,
}: {
  label: string;
  value: number;
  unit: string;
  tone: "info" | "primary" | "success";
}) {
  const grad = {
    info: "bg-gradient-info shadow-info",
    primary: "bg-gradient-primary shadow-primary",
    success: "bg-gradient-success shadow-success",
  }[tone];
  return (
    <div className={`rounded-xl text-white p-3 ${grad}`}>
      <p className="text-[0.65rem] font-bold uppercase tracking-wide text-white/80">
        {label}
      </p>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[0.65rem] text-white/80">{unit}</p>
    </div>
  );
}
