"use client";

import { Card } from "@/components/ui/Card";

const EVENTS = [
  {
    title: "Renal-adjusted vancomycin for P-1002",
    time: "Today · 9:42 AM",
    tone: "info" as const,
  },
  {
    title: "Allergy alert blocked penicillin order for P-1001",
    time: "Today · 8:13 AM",
    tone: "danger" as const,
  },
  {
    title: "Pediatric propofol dose calculated for P-1003",
    time: "Yesterday · 4:21 PM",
    tone: "success" as const,
  },
  {
    title: "Norepinephrine infusion titration logged",
    time: "Yesterday · 11:08 AM",
    tone: "primary" as const,
  },
  {
    title: "Bulk import: 12 new formulary entries reviewed",
    time: "Mar 22 · 2:45 PM",
    tone: "warning" as const,
  },
];

const DOT: Record<string, string> = {
  info: "bg-gradient-info shadow-info",
  danger: "bg-gradient-danger shadow-danger",
  success: "bg-gradient-success shadow-success",
  primary: "bg-gradient-primary shadow-primary",
  warning: "bg-gradient-warning shadow-warning",
};

export function ActivityTimeline() {
  return (
    <Card title="Recent Activity" subtitle="Clinical & audit events" id="audit">
      <div className="relative pl-6">
        <div className="absolute left-2.5 top-0 bottom-0 w-px bg-light dark:bg-white/10" />
        {EVENTS.map((e, i) => (
          <div key={i} className="relative flex items-start gap-3 pb-5 last:pb-0">
            <div
              className={`absolute left-[-14px] top-1.5 w-3 h-3 rounded-full ${DOT[e.tone]}`}
            />
            <div>
              <p className="text-sm font-bold text-dark dark:text-white">
                {e.title}
              </p>
              <p className="text-xs text-muted dark:text-white/40">{e.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
