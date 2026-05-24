import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "info" | "success" | "warning" | "danger" | "dark" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary: "bg-gradient-primary shadow-primary text-white",
  info: "bg-gradient-info shadow-info text-white",
  success: "bg-gradient-success shadow-success text-white",
  warning: "bg-gradient-warning shadow-warning text-white",
  danger: "bg-gradient-danger shadow-danger text-white",
  dark: "bg-gradient-dark shadow-dark text-white",
  ghost:
    "bg-transparent text-body dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5",
  outline:
    "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white",
};

const SIZE: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-2.5 text-xs",
  lg: "px-8 py-3 text-sm",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      children,
      icon,
      trailingIcon,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-bold uppercase tracking-wide transition-all duration-150 hover:-translate-y-px disabled:opacity-60 disabled:pointer-events-none",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
      {trailingIcon}
    </button>
  ),
);
Button.displayName = "Button";
