import {
  LayoutDashboard,
  Pill,
  Users,
  Activity,
  FileText,
  Settings,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  section?: string;
}

export const MENU: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, section: "Clinical" },
  { label: "Patients", href: "/patients", icon: Users, section: "Clinical" },
  { label: "Drug Library", href: "/drugs", icon: Pill, section: "Clinical" },
  { label: "Analytics", href: "/analytics", icon: Activity, section: "Insights" },
  { label: "Reports", href: "/reports", icon: FileText, section: "Insights" },
  { label: "Audit Log", href: "/audit", icon: ShieldCheck, section: "Compliance" },
  { label: "Settings", href: "/settings", icon: Settings, section: "Account" },
];

export const SECTIONS = ["Clinical", "Insights", "Compliance", "Account"] as const;
