"use client";

import { useMemo, useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Info,
  Download,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  AUDIT_LOG,
  ACTION_LABELS,
  filterAudit,
} from "@/lib/data/audit";
import type { AuditEntry, AuditSeverity } from "@/lib/types/audit-types";
import { formatDateTime } from "@/lib/utils";

const SEVERITY_TONE: Record<AuditSeverity, "info" | "success" | "warning" | "danger"> = {
  info: "info",
  success: "success",
  warning: "warning",
  danger: "danger",
};

const SEVERITY_ICON: Record<AuditSeverity, React.ReactNode> = {
  info: <Info size={14} />,
  success: <CheckCircle2 size={14} />,
  warning: <AlertTriangle size={14} />,
  danger: <ShieldAlert size={14} />,
};

const ROLE_LABEL: Record<string, string> = {
  physician: "Physician",
  pharmacist: "Pharmacist",
  nurse: "Nurse",
  admin: "Admin",
  auditor: "Auditor",
};

export default function AuditPage() {
  const [q, setQ] = useState("");
  const [action, setAction] = useState("");
  const [role, setRole] = useState("");
  const [severity, setSeverity] = useState("");

  const rows = useMemo(
    () => filterAudit(AUDIT_LOG, q, action, role, severity),
    [q, action, role, severity],
  );

  const counts = useMemo(() => {
    const c = { total: AUDIT_LOG.length, warning: 0, danger: 0, today: 0 };
    const today = new Date().toISOString().slice(0, 10);
    for (const r of AUDIT_LOG) {
      if (r.severity === "warning") c.warning++;
      if (r.severity === "danger") c.danger++;
      if (r.timestamp.startsWith(today)) c.today++;
    }
    return c;
  }, []);

  function exportCsv() {
    downloadCsv(rows);
  }

  return (
    <AppShell title="Audit Log" breadcrumb="CDSS · Compliance">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-2">
        <StatCard
          label="Total events"
          value={counts.total}
          delta="Last 7 days"
          deltaTone="info"
          icon={<ShieldCheck size={18} />}
          iconGradient="bg-gradient-info shadow-info"
        />
        <StatCard
          label="Today"
          value={counts.today}
          delta="Live stream"
          deltaTone="success"
          icon={<CheckCircle2 size={18} />}
          iconGradient="bg-gradient-success shadow-success"
        />
        <StatCard
          label="Warnings"
          value={counts.warning}
          delta="Review required"
          deltaTone="warning"
          icon={<AlertTriangle size={18} />}
          iconGradient="bg-gradient-warning shadow-warning"
        />
        <StatCard
          label="Critical blocks"
          value={counts.danger}
          delta="RBAC / allergy"
          deltaTone="danger"
          icon={<ShieldAlert size={18} />}
          iconGradient="bg-gradient-danger shadow-danger"
        />
      </div>

      <div className="mt-6">
        <Card
          title="Audit Trail"
          subtitle="Tamper-evident log of every clinical and security action"
          action={
            <Button
              variant="outline"
              size="sm"
              icon={<Download size={14} />}
              onClick={exportCsv}
            >
              Export CSV
            </Button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
            <div className="md:col-span-2">
              <Input
                placeholder="Search actor, patient ID, resource, detail…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <Select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              options={[
                { value: "", label: "All actions" },
                ...Object.entries(ACTION_LABELS).map(([v, l]) => ({
                  value: v,
                  label: l,
                })),
              ]}
            />
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: "", label: "All roles" },
                ...Object.entries(ROLE_LABEL).map(([v, l]) => ({
                  value: v,
                  label: l,
                })),
              ]}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {(["", "info", "success", "warning", "danger"] as const).map((s) => (
              <button
                key={s || "all"}
                onClick={() => setSeverity(s)}
                className={
                  "px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all " +
                  (severity === s
                    ? "bg-gradient-primary shadow-primary text-white"
                    : "bg-white dark:bg-white/5 text-body dark:text-white/60 border border-light dark:border-white/10 hover:border-primary/40")
                }
              >
                {s ? s : "All"}
              </button>
            ))}
            <span className="ml-auto text-xs text-muted dark:text-white/40 font-semibold uppercase tracking-wide">
              {rows.length} of {AUDIT_LOG.length} entries
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {[
                    "Event",
                    "Actor",
                    "Action",
                    "Resource",
                    "Severity",
                    "When",
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
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-light dark:border-white/10 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4 align-top">
                      <p className="text-sm font-bold text-dark dark:text-white">
                        {r.id}
                      </p>
                      <p className="text-xs text-body dark:text-white/60 mt-0.5 max-w-md">
                        {r.detail}
                      </p>
                    </td>
                    <td className="py-3 px-4 align-top whitespace-nowrap">
                      <p className="text-sm font-bold text-dark dark:text-white">
                        {r.actorName}
                      </p>
                      <p className="text-xs text-muted dark:text-white/40">
                        {ROLE_LABEL[r.actorRole]} · {r.ip}
                      </p>
                    </td>
                    <td className="py-3 px-4 align-top whitespace-nowrap">
                      <Badge tone="dark">{ACTION_LABELS[r.action]}</Badge>
                    </td>
                    <td className="py-3 px-4 align-top whitespace-nowrap">
                      <p className="text-sm text-dark dark:text-white font-semibold">
                        {r.resource}
                      </p>
                      <p className="text-xs text-muted dark:text-white/40">
                        {r.resourceId ?? r.patientId ?? "—"}
                      </p>
                    </td>
                    <td className="py-3 px-4 align-top whitespace-nowrap">
                      <Badge tone={SEVERITY_TONE[r.severity]}>
                        <span className="inline-flex items-center gap-1.5">
                          {SEVERITY_ICON[r.severity]}
                          {r.severity}
                        </span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4 align-top whitespace-nowrap text-xs text-body dark:text-white/60">
                      {formatDateTime(r.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length === 0 && (
              <p className="text-center text-sm text-muted dark:text-white/40 py-10">
                No audit entries match the current filter.
              </p>
            )}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function downloadCsv(rows: AuditEntry[]) {
  const header = [
    "id",
    "timestamp",
    "actor",
    "role",
    "action",
    "resource",
    "resource_id",
    "patient_id",
    "severity",
    "ip",
    "detail",
  ];
  const lines = rows.map((r) =>
    [
      r.id,
      r.timestamp,
      r.actorName,
      r.actorRole,
      r.action,
      r.resource,
      r.resourceId ?? "",
      r.patientId ?? "",
      r.severity,
      r.ip,
      `"${r.detail.replace(/"/g, '""')}"`,
    ].join(","),
  );
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `audit-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
