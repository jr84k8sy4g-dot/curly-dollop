"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PatientPanel } from "@/components/dashboard/PatientPanel";
import { DrugSearch } from "@/components/dashboard/DrugSearch";
import { DoseCalculator } from "@/components/dashboard/DoseCalculator";
import { ClinicalAlerts } from "@/components/dashboard/ClinicalAlerts";
import { DrugDetailCard } from "@/components/dashboard/DrugDetailCard";
import { DoseReport } from "@/components/dashboard/DoseReport";
import { PATIENTS } from "@/lib/data/patients";
import { findDrug } from "@/lib/data/drugs";
import type { Drug, Patient } from "@/lib/types/drug-types";
import type { CalcResult } from "@/lib/types/calc-types";

const RECENT_KEY = "cdss-recent";
const FAV_KEY = "cdss-fav";
const PATIENT_KEY = "cdss-patient";

export default function DashboardPage() {
  const [patient, setPatient] = useState<Patient>(PATIENTS[0]!);
  const [drug, setDrug] = useState<Drug | null>(findDrug("propofol") ?? null);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [recents, setRecents] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const r = localStorage.getItem(RECENT_KEY);
    if (r) setRecents(JSON.parse(r));
    const f = localStorage.getItem(FAV_KEY);
    if (f) setFavorites(JSON.parse(f));
    const p = localStorage.getItem(PATIENT_KEY);
    if (p) {
      try {
        setPatient(JSON.parse(p));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(PATIENT_KEY, JSON.stringify(patient));
  }, [patient]);

  function handleSelectDrug(d: Drug) {
    setDrug(d);
    const next = [d.id, ...recents.filter((id) => id !== d.id)].slice(0, 5);
    setRecents(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  }

  function toggleFavorite(id: string) {
    const next = favorites.includes(id)
      ? favorites.filter((x) => x !== id)
      : [...favorites, id].slice(0, 10);
    setFavorites(next);
    localStorage.setItem(FAV_KEY, JSON.stringify(next));
  }

  return (
    <AppShell title="Clinical Workspace" breadcrumb="CDSS · Dosage Platform">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-2">
        <div className="xl:col-span-4 space-y-6">
          <PatientPanel patient={patient} onChange={setPatient} />
          <DrugDetailCard drug={drug} />
        </div>

        <div className="xl:col-span-8 space-y-6">
          <DrugSearch
            selectedId={drug?.id ?? null}
            onSelect={handleSelectDrug}
            recents={recents}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
          <DoseCalculator drug={drug} patient={patient} onResult={setResult} />
          <ClinicalAlerts warnings={result?.warnings ?? []} />
          <DoseReport patient={patient} drug={drug} result={result} />
        </div>
      </div>
    </AppShell>
  );
}
