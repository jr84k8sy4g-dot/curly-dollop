"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
}: ToggleProps) {
  return (
    <label
      className={cn(
        "flex items-start justify-between gap-4 py-3 cursor-pointer select-none",
        disabled && "opacity-60 cursor-not-allowed",
      )}
    >
      <div className="min-w-0">
        {label && (
          <p className="text-sm font-bold text-dark dark:text-white">{label}</p>
        )}
        {description && (
          <p className="text-xs text-body dark:text-white/60 mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-10 h-5 rounded-full transition-all shrink-0 mt-0.5",
          checked
            ? "bg-gradient-primary shadow-primary"
            : "bg-light dark:bg-white/20",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all",
            checked ? "right-0.5" : "left-0.5",
          )}
        />
      </button>
    </label>
  );
}
