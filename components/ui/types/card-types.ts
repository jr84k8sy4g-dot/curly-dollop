import type { ReactNode } from "react";

export interface CardProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
  action?: ReactNode;
  id?: string;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaTone?: "success" | "danger" | "info" | "warning";
  icon: ReactNode;
  iconGradient?:
    | "bg-gradient-primary shadow-primary"
    | "bg-gradient-info shadow-info"
    | "bg-gradient-success shadow-success"
    | "bg-gradient-warning shadow-warning"
    | "bg-gradient-danger shadow-danger"
    | "bg-gradient-dark shadow-dark";
}
