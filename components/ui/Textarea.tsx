import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className, id, ...props }, ref) => {
    const tId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={tId}
            className="text-xs font-bold text-dark dark:text-white mb-1.5 block uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <textarea
          id={tId}
          ref={ref}
          className={cn(
            "w-full px-3 py-2.5 text-sm text-body dark:text-white/80 bg-white dark:bg-dark-card border border-input dark:border-white/20 rounded-lg outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-primary focus:ring-2 focus:ring-primary/15 min-h-[80px]",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
