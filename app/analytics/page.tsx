"use client";

import {
  Pill,
  Calculator,
  Users,
  AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui/StatCard";
import { Card } from "@/components/ui/Card";
import { UtilizationChart } from "@/components/analytics/UtilizationChart";
import { MostUsedDrugs } from "@/components/analytics/MostUsedDrugs";
import { ActivityTimeline } from "@/components/analytics/ActivityTimeline";

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics" breadcrumb="CDSS · Insights">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-2">
        <StatCard
          label="Calculations / day"
          value="132"
          delta="+18%"
          deltaTone="success"
          icon={<Calculator size={18} />}
          iconGradient="bg-gradient-primary shadow-primary"
        />
        <StatCard
          label="Patients treated"
          value="84"
          delta="+6%"
          deltaTone="success"
          icon={<Users size={18} />}
          iconGradient="bg-gradient-info shadow-info"
        />
        <StatCard
          label="Most-used drug"
          value="Propofol"
          delta="342 uses"
          deltaTone="info"
          icon={<Pill size={18} />}
          iconGradient="bg-gradient-success shadow-success"
        />
        <StatCard
          label="Alerts triggered"
          value="83"
          delta="-12%"
          deltaTone="success"
          icon={<AlertTriangle size={18} />}
          iconGradient="bg-gradient-warning shadow-warning"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <div className="xl:col-span-2">
          <Card
            title="Drug Utilization"
            subtitle="Calculations vs. clinical alerts · week"
          >
            <UtilizationChart />
          </Card>
        </div>
        <MostUsedDrugs />
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ActivityTimeline />
        </div>
        <Card title="Compliance" subtitle="HIPAA · audit posture">
          <div className="rounded-2xl bg-gradient-dark text-white p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">
              Audit coverage
            </p>
            <p className="text-3xl font-bold mt-1">100%</p>
            <p className="text-sm text-white/80 mt-2">
              All clinical actions logged. AES-256 at rest, TLS 1.3 in transit.
            </p>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <Row k="Encrypted columns" v="patient PII, vitals" />
            <Row k="RBAC roles" v="physician, pharmacist, nurse, admin" />
            <Row k="MFA enforced" v="all clinical users" />
            <Row k="Session timeout" v="15 min" />
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-light dark:border-white/10 last:border-0">
      <span className="text-xs text-muted dark:text-white/40 uppercase tracking-wide font-bold">
        {k}
      </span>
      <span className="text-sm text-dark dark:text-white font-semibold">
        {v}
      </span>
    </div>
  );
}
