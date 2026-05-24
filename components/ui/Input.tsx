import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-bold text-dark dark:text-white mb-1.5 block uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full px-3 py-2.5 text-sm text-body dark:text-white/80 bg-white dark:bg-dark-card border border-input dark:border-white/20 rounded-lg outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-white/40",
            "focus:border-primary focus:ring-2 focus:ring-primary/15",
            error && "border-danger focus:ring-danger/15",
            className,
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-danger mt-1.5 font-semibold">{error}</p>
        ) : (
          hint && (
            <p className="text-xs text-muted dark:text-white/40 mt-1.5">
              {hint}
            </p>
          )
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
