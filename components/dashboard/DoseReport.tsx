"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Textarea";
import { Download, Printer, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import type { CalcResult } from "@/lib/types/calc-types";
import type { Drug, Patient } from "@/lib/types/drug-types";
import { formatDateTime, formatNumber } from "@/lib/utils";

interface Props {
  patient: Patient;
  drug: Drug | null;
  result: CalcResult | null;
}

export function DoseReport({ patient, drug, result }: Props) {
  const [notes, setNotes] = useState("");

  function exportCSV() {
    if (!drug || !result) return;
    const rows = [
      ["Field", "Value"],
      ["Generated", formatDateTime(new Date())],
      ["Patient ID", patient.id],
      ["Patient Name", patient.name],
      ["Weight (kg)", String(patient.weightKg)],
      ["Height (cm)", String(patient.heightCm)],
      ["Age", String(patient.age)],
      ["Gender", patient.gender],
      ["BMI", String(patient.bmi ?? "")],
      ["BSA (m²)", String(patient.bsaM2 ?? "")],
      ["Drug", drug.name],
      ["Generic", drug.genericName],
      ["Concentration", drug.concentration],
      ["Total Dose (mg)", String(result.totalDoseMg)],
      ["Volume (mL)", result.volumeMl !== undefined ? String(result.volumeMl) : ""],
      [
        "Infusion Rate (mL/hr)",
        result.infusionRateMlHr !== undefined ? String(result.infusionRateMlHr) : "",
      ],
      ["Notes", notes],
    ];
    const csv = rows
      .map((r) => r.map((v) => `"${(v || "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    download(`dose-report-${patient.id}-${Date.now()}.csv`, csv, "text/csv");
  }

  function exportJSON() {
    if (!drug || !result) return;
    const payload = {
      generatedAt: new Date().toISOString(),
      patient,
      drug: { id: drug.id, name: drug.name, generic: drug.genericName },
      result,
      physicianNotes: notes,
    };
    download(
      `dose-report-${patient.id}-${Date.now()}.json`,
      JSON.stringify(payload, null, 2),
      "application/json",
    );
  }

  function printReport() {
    window.print();
  }

  if (!drug || !result) {
    return (
      <Card title="Patient Dose Report" subtitle="Generated after calculation" id="report">
        <div className="rounded-xl border border-dashed border-light dark:border-white/10 p-10 text-center">
          <p className="text-sm text-muted dark:text-white/40">
            Complete a calculation to generate the report.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card title="Patient Dose Report" subtitle={`Generated ${formatDateTime(new Date())}`} id="report">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          <ReportBlock label="Patient">
            <p className="text-sm font-bold text-dark dark:text-white">
              {patient.name}{" "}
              <span className="text-muted dark:text-white/40 font-normal">
                · {patient.id}
              </span>
            </p>
            <p className="text-sm text-body dark:text-white/60">
              {patient.age}y · {patient.gender} · {patient.weightKg} kg ·{" "}
              {patient.heightCm} cm
            </p>
            <p className="text-xs text-muted dark:text-white/40 mt-1">
              BMI {patient.bmi} · IBW {patient.ibwKg} · ABW {patient.abwKg} ·
              BSA {patient.bsaM2}
            </p>
          </ReportBlock>

          <ReportBlock label="Drug">
            <p className="text-sm font-bold text-dark dark:text-white">
              {drug.name}
            </p>
            <p className="text-sm text-body dark:text-white/60">
              {drug.genericName} · {drug.concentration} · {drug.defaultRoute}
            </p>
            <div className="flex gap-1.5 mt-1">
              <Badge tone="info">{drug.category}</Badge>
            </div>
          </ReportBlock>
        </div>

        <div className="rounded-2xl bg-gradient-dark text-white p-5 mb-5">
          <p className="text-xs font-bold uppercase tracking-wide text-white/70 mb-2">
            Dosage recommendation
          </p>
          <p className="text-3xl font-bold mb-1">
            {formatNumber(result.totalDoseMg)} mg
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            {result.volumeMl !== undefined && (
              <span>Volume {formatNumber(result.volumeMl)} mL</span>
            )}
            {result.infusionRateMlHr !== undefined && (
              <span>Rate {formatNumber(result.infusionRateMlHr)} mL/hr</span>
            )}
            {result.dropsPerMinute !== undefined && (
              <span>{formatNumber(result.dropsPerMinute)} gtts/min</span>
            )}
          </div>
        </div>

        {result.notes.length > 0 && (
          <ReportBlock label="Calculation steps">
            <ul className="space-y-1">
              {result.notes.map((n, i) => (
                <li key={i} className="text-sm text-body dark:text-white/80">
                  · {n}
                </li>
              ))}
            </ul>
          </ReportBlock>
        )}

        {result.warnings.length > 0 && (
          <ReportBlock label="Clinical alerts">
            <ul className="space-y-1.5">
              {result.warnings.map((w, i) => (
                <li key={i} className="text-sm">
                  <span className="font-bold text-danger uppercase text-xs mr-2">
                    {w.severity}
                  </span>
                  <span className="text-body dark:text-white/80">{w.message}</span>
                </li>
              ))}
            </ul>
          </ReportBlock>
        )}

        <div className="mt-5">
          <Textarea
            label="Physician notes"
            placeholder="Add clinical notes, justifications, or follow-up instructions…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2 no-print">
          <Button variant="primary" icon={<Printer size={14} />} onClick={printReport}>
            Print / Save PDF
          </Button>
          <Button variant="info" icon={<FileSpreadsheet size={14} />} onClick={exportCSV}>
            Export CSV
          </Button>
          <Button variant="dark" icon={<Download size={14} />} onClick={exportJSON}>
            Export JSON
          </Button>
        </div>
      </Card>

      <PrintableReport
        patient={patient}
        drug={drug}
        result={result}
        notes={notes}
      />
    </>
  );
}

function ReportBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted dark:text-white/40 mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

function PrintableReport({
  patient,
  drug,
  result,
  notes,
}: {
  patient: Patient;
  drug: Drug;
  result: CalcResult;
  notes: string;
}) {
  return (
    <div className="printable p-8 text-black bg-white" style={{ fontFamily: "Open Sans, sans-serif" }}>
      <h1 style={{ fontSize: 22, fontWeight: 800 }}>
        CDSS — Patient Dose Report
      </h1>
      <p style={{ fontSize: 12, color: "#555" }}>
        Generated {formatDateTime(new Date())}
      </p>
      <hr style={{ margin: "12px 0" }} />
      <h2 style={{ fontSize: 14, fontWeight: 700 }}>Patient</h2>
      <p style={{ fontSize: 12 }}>
        {patient.name} · {patient.id} · {patient.age}y · {patient.gender} ·{" "}
        {patient.weightKg} kg · {patient.heightCm} cm
      </p>
      <p style={{ fontSize: 12, color: "#555" }}>
        BMI {patient.bmi} · IBW {patient.ibwKg} kg · ABW {patient.abwKg} kg ·
        BSA {patient.bsaM2} m² · eGFR {patient.egfr ?? "—"}
      </p>
      <h2 style={{ fontSize: 14, fontWeight: 700, marginTop: 14 }}>Drug</h2>
      <p style={{ fontSize: 12 }}>
        {drug.name} ({drug.genericName}) · {drug.concentration} ·{" "}
        {drug.defaultRoute}
      </p>
      <h2 style={{ fontSize: 14, fontWeight: 700, marginTop: 14 }}>
        Dose recommendation
      </h2>
      <p style={{ fontSize: 22, fontWeight: 800 }}>
        {formatNumber(result.totalDoseMg)} mg
      </p>
      {result.volumeMl !== undefined && (
        <p style={{ fontSize: 12 }}>
          Volume {formatNumber(result.volumeMl)} mL · Rate{" "}
          {result.infusionRateMlHr ?? "—"} mL/hr · Drops{" "}
          {result.dropsPerMinute ?? "—"}/min
        </p>
      )}
      <h2 style={{ fontSize: 14, fontWeight: 700, marginTop: 14 }}>
        Calculation
      </h2>
      <ul style={{ fontSize: 12 }}>
        {result.notes.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
      {result.warnings.length > 0 && (
        <>
          <h2 style={{ fontSize: 14, fontWeight: 700, marginTop: 14 }}>
            Clinical alerts
          </h2>
          <ul style={{ fontSize: 12 }}>
            {result.warnings.map((w, i) => (
              <li key={i}>
                <strong>{w.severity.toUpperCase()}</strong>: {w.message}
              </li>
            ))}
          </ul>
        </>
      )}
      {notes && (
        <>
          <h2 style={{ fontSize: 14, fontWeight: 700, marginTop: 14 }}>
            Physician notes
          </h2>
          <p style={{ fontSize: 12, whiteSpace: "pre-wrap" }}>{notes}</p>
        </>
      )}
      <hr style={{ margin: "16px 0" }} />
      <p style={{ fontSize: 10, color: "#777" }}>
        This document is generated for clinical decision support. Verify all
        dosages against institutional protocols before administration.
      </p>
    </div>
  );
}

function download(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
