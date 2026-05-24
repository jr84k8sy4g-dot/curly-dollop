"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  Activity,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { cn, formatDateTime, formatNumber } from "@/lib/utils";
import {
  REPORT_DEFINITIONS,
  REPORT_TITLES,
  RECENT_REPORTS,
  buildSampleReportPayload,
} from "@/lib/data/reports";
import type {
  ReportFormat,
  ReportKind,
  ReportRecord,
} from "@/lib/types/report-types";

const STATUS_TONE: Record<ReportRecord["status"], "success" | "warning" | "danger"> = {
  ready: "success",
  queued: "warning",
  failed: "danger",
};

export default function ReportsPage() {
  const [kind, setKind] = useState<ReportKind>("drug_utilization");
  const [from, setFrom] = useState("2026-05-18");
  const [to, setTo] = useState("2026-05-24");
  const [format, setFormat] = useState<ReportFormat>("csv");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setBusy(true);
    setError(null);
    try {
      const payload = buildSampleReportPayload(kind, `${from} → ${to}`) ?? {};
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format,
          payload: flatten({
            from,
            to,
            ...payload,
          }),
        } satisfies { format: ReportFormat; payload: Record<string, unknown> }),
      });
      if (!res.ok) {
        setError(`Server responded ${res.status}`);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${kind}-${from}_${to}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate");
    } finally {
      setBusy(false);
    }
  }

  const totalRows = RECENT_REPORTS.reduce((s, r) => s + r.rows, 0);

  return (
    <AppShell title="Reports" breadcrumb="CDSS · Insights">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-2">
        <StatCard
          label="Reports available"
          value={RECENT_REPORTS.length}
          delta="Last 30 days"
          deltaTone="info"
          icon={<FileText size={18} />}
          iconGradient="bg-gradient-primary shadow-primary"
        />
        <StatCard
          label="Rows aggregated"
          value={formatNumber(totalRows)}
          delta="+9% vs. prior period"
          deltaTone="success"
          icon={<Activity size={18} />}
          iconGradient="bg-gradient-info shadow-info"
        />
        <StatCard
          label="Scheduled jobs"
          value="4"
          delta="Weekly cadence"
          deltaTone="info"
          icon={<Calendar size={18} />}
          iconGradient="bg-gradient-success shadow-success"
        />
        <StatCard
          label="Success rate"
          value="100%"
          delta="No failures"
          deltaTone="success"
          icon={<CheckCircle2 size={18} />}
          iconGradient="bg-gradient-warning shadow-warning"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card
            title="Generate Report"
            subtitle="Choose a report type and a window — output is signed and audit-logged"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select
                label="Report type"
                value={kind}
                onChange={(e) => setKind(e.target.value as ReportKind)}
                options={REPORT_DEFINITIONS.map((d) => ({
                  value: d.kind,
                  label: d.title,
                }))}
              />
              <Select
                label="Format"
                value={format}
                onChange={(e) => setFormat(e.target.value as ReportFormat)}
                options={[
                  { value: "csv", label: "CSV" },
                  { value: "json", label: "JSON" },
                ]}
              />
              <Input
                label="From"
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
              <Input
                label="To"
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            {error && (
              <p className="mt-4 text-xs text-danger font-semibold">{error}</p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button
                onClick={generate}
                disabled={busy}
                icon={<Download size={14} />}
              >
                {busy ? "Generating…" : "Generate & Download"}
              </Button>
              <p className="text-xs text-muted dark:text-white/40">
                {REPORT_DEFINITIONS.find((d) => d.kind === kind)?.description}
              </p>
            </div>
          </Card>
        </div>

        <Card title="Templates" subtitle="One-click presets">
          <div className="space-y-3">
            {REPORT_DEFINITIONS.map((d) => (
              <button
                key={d.kind}
                onClick={() => setKind(d.kind)}
                className={cn(
                  "w-full text-left rounded-xl border p-3 transition-all flex items-start gap-3",
                  kind === d.kind
                    ? "border-primary/40 bg-primary/5"
                    : "border-light dark:border-white/10 hover:border-primary/40",
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0",
                    d.gradient,
                  )}
                >
                  <FileText size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-dark dark:text-white">
                    {d.title}
                  </p>
                  <p className="text-xs text-body dark:text-white/60 mt-0.5 leading-snug">
                    {d.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card
          title="Recent Reports"
          subtitle="Generated reports retained for 90 days"
          action={
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-success">
              <TrendingUp size={14} /> All ready
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {[
                    "Report",
                    "Type",
                    "Range",
                    "Generated by",
                    "Size",
                    "Status",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[0.65rem] font-bold uppercase tracking-wide text-body dark:text-white/40 pb-3 px-4 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_REPORTS.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-light dark:border-white/10 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4 align-top">
                      <p className="text-sm font-bold text-dark dark:text-white">
                        {r.title}
                      </p>
                      <p className="text-xs text-muted dark:text-white/40">
                        {r.id} · {formatDateTime(r.generatedAt)}
                      </p>
                    </td>
                    <td className="py-3 px-4 align-top whitespace-nowrap">
                      <Badge tone="info">{REPORT_TITLES[r.kind]}</Badge>
                    </td>
                    <td className="py-3 px-4 align-top whitespace-nowrap text-sm text-body dark:text-white/80">
                      {r.range}
                    </td>
                    <td className="py-3 px-4 align-top whitespace-nowrap text-sm text-body dark:text-white/80">
                      {r.generatedBy}
                    </td>
                    <td className="py-3 px-4 align-top whitespace-nowrap text-sm text-body dark:text-white/80">
                      {formatNumber(r.rows)} rows · {r.sizeKb} KB ·{" "}
                      <span className="uppercase font-bold text-xs">
                        {r.format}
                      </span>
                    </td>
                    <td className="py-3 px-4 align-top whitespace-nowrap">
                      <Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge>
                    </td>
                    <td className="py-3 px-4 align-top whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Download size={14} />}
                        onClick={() => downloadRecord(r)}
                      >
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function flatten(o: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(o)) {
    out[k] =
      typeof v === "object" && v !== null ? JSON.stringify(v) : (v as unknown);
  }
  return out;
}

function downloadRecord(r: ReportRecord) {
  const payload = buildSampleReportPayload(r.kind, r.range) ?? {};
  const blob = new Blob([JSON.stringify({ id: r.id, ...payload }, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${r.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
