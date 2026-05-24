"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Drug } from "@/lib/types/drug-types";
import { BookOpen, FlaskConical, Eye, AlertCircle } from "lucide-react";

export function DrugDetailCard({ drug }: { drug: Drug | null }) {
  if (!drug) {
    return (
      <Card title="Drug Information" subtitle="Reference monograph">
        <div className="rounded-xl border border-dashed border-light dark:border-white/10 p-10 text-center">
          <BookOpen
            size={28}
            className="mx-auto text-muted dark:text-white/40 mb-2"
          />
          <p className="text-sm text-muted dark:text-white/40">
            Select a drug to view monograph
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={drug.name}
      subtitle={`${drug.genericName} · ${drug.brandNames.join(", ")}`}
      action={<Badge tone="info">{drug.category}</Badge>}
    >
      <div className="space-y-5">
        <Section
          title="Mechanism of action"
          icon={<FlaskConical size={14} />}
          body={drug.mechanism}
        />

        <Section
          title="Indications"
          icon={<Eye size={14} />}
          list={drug.indications}
        />

        <Section
          title="Contraindications"
          icon={<AlertCircle size={14} />}
          list={drug.contraindications}
          tone="danger"
        />

        <Section
          title="Warnings"
          icon={<AlertCircle size={14} />}
          list={drug.warnings}
          tone="warning"
        />

        <Section
          title="Drug interactions"
          icon={<AlertCircle size={14} />}
          list={drug.interactions}
          tone="info"
        />

        <Section
          title="Monitoring requirements"
          icon={<Eye size={14} />}
          list={drug.monitoring}
        />

        <div className="grid grid-cols-2 gap-3">
          {drug.renalAdjustment && (
            <div className="rounded-xl bg-page dark:bg-white/5 p-3">
              <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted dark:text-white/40">
                Renal
              </p>
              <p className="text-sm text-dark dark:text-white font-semibold mt-1">
                eGFR &lt; {drug.renalAdjustment.threshold} → reduce{" "}
                {Math.round(drug.renalAdjustment.reduction * 100)}%
              </p>
              <p className="text-xs text-body dark:text-white/60 mt-1">
                {drug.renalAdjustment.note}
              </p>
            </div>
          )}
          {drug.hepaticAdjustment && (
            <div className="rounded-xl bg-page dark:bg-white/5 p-3">
              <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted dark:text-white/40">
                Hepatic
              </p>
              <p className="text-sm text-dark dark:text-white font-semibold mt-1">
                Reduce up to{" "}
                {Math.round(drug.hepaticAdjustment.reduction * 100)}%
              </p>
              <p className="text-xs text-body dark:text-white/60 mt-1">
                {drug.hepaticAdjustment.note}
              </p>
            </div>
          )}
        </div>

        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted dark:text-white/40 mb-2">
            References
          </p>
          <div className="flex flex-wrap gap-2">
            {drug.references.map((r) => (
              <Badge key={r} tone="dark">
                {r}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function Section({
  title,
  icon,
  body,
  list,
  tone = "info",
}: {
  title: string;
  icon: React.ReactNode;
  body?: string;
  list?: string[];
  tone?: "info" | "warning" | "danger";
}) {
  const dot = {
    info: "bg-info",
    warning: "bg-warning",
    danger: "bg-danger",
  }[tone];
  return (
    <div>
      <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted dark:text-white/40 mb-2 flex items-center gap-1.5">
        {icon}
        {title}
      </p>
      {body && (
        <p className="text-sm text-body dark:text-white/80 leading-relaxed">
          {body}
        </p>
      )}
      {list && (
        <ul className="space-y-1.5">
          {list.map((item, i) => (
            <li
              key={i}
              className="text-sm text-body dark:text-white/80 flex items-start gap-2"
            >
              <span
                className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dot}`}
              />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
