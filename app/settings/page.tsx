"use client";

import { useState } from "react";
import {
  User,
  Ruler,
  ShieldAlert,
  Bell,
  Palette,
  Save,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Badge } from "@/components/ui/Badge";
import { DEFAULT_SETTINGS } from "@/lib/data/settings";
import type {
  AccountSettings,
  NotificationPreferences,
  SafetyPreferences,
  AppearancePreferences,
} from "@/lib/types/settings-types";
import { cn } from "@/lib/utils";

type SectionKey = "profile" | "units" | "safety" | "notifications" | "appearance";

const SECTIONS: { key: SectionKey; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "Profile", icon: <User size={16} /> },
  { key: "units", label: "Units & Locale", icon: <Ruler size={16} /> },
  { key: "safety", label: "Safety Rules", icon: <ShieldAlert size={16} /> },
  { key: "notifications", label: "Notifications", icon: <Bell size={16} /> },
  { key: "appearance", label: "Appearance", icon: <Palette size={16} /> },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<AccountSettings>(DEFAULT_SETTINGS);
  const [active, setActive] = useState<SectionKey>("profile");
  const [saved, setSaved] = useState(false);

  function patch<K extends keyof AccountSettings>(
    key: K,
    next: Partial<AccountSettings[K]>,
  ) {
    setSettings((s) => ({ ...s, [key]: { ...s[key], ...next } }));
    setSaved(false);
  }

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <AppShell title="Settings" breadcrumb="CDSS · Account">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 mt-2">
        <aside>
          <Card className="!p-2">
            <nav className="space-y-1">
              {SECTIONS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActive(s.key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all text-left",
                    active === s.key
                      ? "bg-gradient-primary shadow-primary text-white"
                      : "text-body dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5",
                  )}
                >
                  {s.icon}
                  {s.label}
                </button>
              ))}
            </nav>
          </Card>
        </aside>

        <div className="min-w-0 space-y-6">
          {active === "profile" && (
            <ProfileSection
              value={settings.profile}
              onChange={(p) => patch("profile", p)}
            />
          )}
          {active === "units" && (
            <UnitsSection
              value={settings.units}
              onChange={(p) => patch("units", p)}
            />
          )}
          {active === "safety" && (
            <SafetySection
              value={settings.safety}
              onChange={(p) => patch("safety", p)}
            />
          )}
          {active === "notifications" && (
            <NotificationsSection
              value={settings.notifications}
              onChange={(p) => patch("notifications", p)}
            />
          )}
          {active === "appearance" && (
            <AppearanceSection
              value={settings.appearance}
              onChange={(p) => patch("appearance", p)}
            />
          )}

          <div className="flex items-center gap-3">
            <Button icon={<Save size={14} />} onClick={save}>
              Save changes
            </Button>
            {saved && (
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-success">
                <CheckCircle2 size={14} /> Saved
              </span>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function ProfileSection({
  value,
  onChange,
}: {
  value: AccountSettings["profile"];
  onChange: (p: Partial<AccountSettings["profile"]>) => void;
}) {
  return (
    <Card
      title="Profile"
      subtitle="Identifying information used in audit logs and signed reports"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full name"
          value={value.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          value={value.email}
          onChange={(e) => onChange({ email: e.target.value })}
        />
        <Select
          label="Role"
          value={value.role}
          onChange={(e) =>
            onChange({ role: e.target.value as typeof value.role })
          }
          options={[
            { value: "physician", label: "Physician" },
            { value: "pharmacist", label: "Pharmacist" },
            { value: "nurse", label: "Nurse" },
            { value: "admin", label: "Admin" },
            { value: "auditor", label: "Auditor" },
          ]}
        />
        <Input
          label="License number"
          value={value.licenseNumber}
          onChange={(e) => onChange({ licenseNumber: e.target.value })}
        />
        <Input
          label="Department"
          value={value.department}
          onChange={(e) => onChange({ department: e.target.value })}
        />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Badge tone="success">MFA enrolled</Badge>
        <Badge tone="info">SOC 2 trained</Badge>
        <Badge tone="dark">HIPAA module · 2026-Q1</Badge>
      </div>
    </Card>
  );
}

function UnitsSection({
  value,
  onChange,
}: {
  value: AccountSettings["units"];
  onChange: (p: Partial<AccountSettings["units"]>) => void;
}) {
  return (
    <Card title="Units & Locale" subtitle="Defaults applied across the workspace">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Weight"
          value={value.weight}
          onChange={(e) =>
            onChange({ weight: e.target.value as typeof value.weight })
          }
          options={[
            { value: "kg", label: "Kilograms (kg)" },
            { value: "lb", label: "Pounds (lb)" },
          ]}
        />
        <Select
          label="Height"
          value={value.height}
          onChange={(e) =>
            onChange({ height: e.target.value as typeof value.height })
          }
          options={[
            { value: "cm", label: "Centimeters (cm)" },
            { value: "in", label: "Inches (in)" },
          ]}
        />
        <Select
          label="Concentration"
          value={value.concentration}
          onChange={(e) =>
            onChange({
              concentration: e.target.value as typeof value.concentration,
            })
          }
          options={[
            { value: "metric", label: "Metric (mg, mcg, mL)" },
            { value: "imperial", label: "Imperial (gr, oz)" },
          ]}
        />
        <Select
          label="Date format"
          value={value.dateFormat}
          onChange={(e) =>
            onChange({ dateFormat: e.target.value as typeof value.dateFormat })
          }
          options={[
            { value: "iso", label: "ISO · 2026-05-25" },
            { value: "us", label: "US · 05/25/2026" },
            { value: "eu", label: "EU · 25/05/2026" },
          ]}
        />
      </div>
    </Card>
  );
}

function SafetySection({
  value,
  onChange,
}: {
  value: SafetyPreferences;
  onChange: (p: Partial<SafetyPreferences>) => void;
}) {
  const items: {
    key: keyof SafetyPreferences;
    label: string;
    description: string;
  }[] = [
    {
      key: "confirmHighRiskDoses",
      label: "Confirm high-risk doses",
      description:
        "Require explicit confirmation before signing doses above the recommended ceiling.",
    },
    {
      key: "blockOnAllergyMatch",
      label: "Block on allergy match",
      description: "Prevent order entry when a drug matches a documented allergy.",
    },
    {
      key: "showRenalAdjustmentBanner",
      label: "Show renal adjustment banner",
      description:
        "Surface eGFR-driven dose adjustments inline on the calculator.",
    },
    {
      key: "showHepaticAdjustmentBanner",
      label: "Show hepatic adjustment banner",
      description:
        "Surface hepatic-impairment-driven dose adjustments inline on the calculator.",
    },
    {
      key: "pediatricDoubleCheck",
      label: "Pediatric double-check",
      description:
        "Require a second clinician to co-sign pediatric calculations under 18 kg.",
    },
  ];

  return (
    <Card
      title="Safety Rules"
      subtitle="Guardrails enforced inside the dose calculator"
    >
      <div className="divide-y divide-light dark:divide-white/10">
        {items.map((it) => (
          <Toggle
            key={it.key}
            label={it.label}
            description={it.description}
            checked={value[it.key]}
            onChange={(next) => onChange({ [it.key]: next } as Partial<SafetyPreferences>)}
          />
        ))}
      </div>
    </Card>
  );
}

function NotificationsSection({
  value,
  onChange,
}: {
  value: NotificationPreferences;
  onChange: (p: Partial<NotificationPreferences>) => void;
}) {
  const items: {
    key: keyof NotificationPreferences;
    label: string;
    description: string;
  }[] = [
    {
      key: "emailDaily",
      label: "Daily email digest",
      description: "Summary of calculations and alerts from the prior 24 hours.",
    },
    {
      key: "emailWeekly",
      label: "Weekly email digest",
      description: "Utilization, safety blocks, and audit posture every Monday.",
    },
    {
      key: "inAppCritical",
      label: "In-app critical alerts",
      description: "Toast notifications for allergy blocks and RBAC denials.",
    },
    {
      key: "inAppWarnings",
      label: "In-app warnings",
      description: "Toast notifications for interaction and max-dose warnings.",
    },
    {
      key: "smsCritical",
      label: "SMS critical alerts",
      description: "Page on-call when a critical event is logged.",
    },
  ];

  return (
    <Card title="Notifications" subtitle="Channels and cadence">
      <div className="divide-y divide-light dark:divide-white/10">
        {items.map((it) => (
          <Toggle
            key={it.key}
            label={it.label}
            description={it.description}
            checked={value[it.key]}
            onChange={(next) =>
              onChange({ [it.key]: next } as Partial<NotificationPreferences>)
            }
          />
        ))}
      </div>
    </Card>
  );
}

function AppearanceSection({
  value,
  onChange,
}: {
  value: AppearancePreferences;
  onChange: (p: Partial<AppearancePreferences>) => void;
}) {
  return (
    <Card title="Appearance" subtitle="Display preferences for this workstation">
      <Select
        label="Theme"
        value={value.theme}
        onChange={(e) =>
          onChange({ theme: e.target.value as typeof value.theme })
        }
        options={[
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
          { value: "system", label: "Follow system" },
        ]}
      />
      <div className="mt-4 divide-y divide-light dark:divide-white/10">
        <Toggle
          label="Compact sidebar"
          description="Reduce sidebar to icon-only mode on desktop."
          checked={value.sidebarCompact}
          onChange={(next) => onChange({ sidebarCompact: next })}
        />
        <Toggle
          label="Reduced motion"
          description="Disable non-essential animations and transitions."
          checked={value.reducedMotion}
          onChange={(next) => onChange({ reducedMotion: next })}
        />
      </div>
    </Card>
  );
}
