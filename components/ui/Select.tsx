import type { SelectHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, hint, className, id, ...props }, ref) => {
    const selectId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-bold text-dark dark:text-white mb-1.5 block uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "w-full px-3 py-2.5 text-sm text-body dark:text-white/80 bg-white dark:bg-dark-card border border-input dark:border-white/20 rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15",
            className,
          )}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {hint && (
          <p className="text-xs text-muted dark:text-white/40 mt-1.5">{hint}</p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
