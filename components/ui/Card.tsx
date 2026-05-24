import type { CardProps } from "./types/card-types";
import { cn } from "@/lib/utils";

export function Card({ title, subtitle, className, children, action, id }: CardProps) {
  return (
    <div
      id={id}
      className={cn(
        "bg-white dark:bg-dark-card rounded-2xl shadow-soft dark:shadow-soft-dark relative overflow-visible",
        className,
      )}
    >
      {(title || action) && (
        <div className="px-6 pt-6 pb-0 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h6 className="text-dark dark:text-white font-bold text-lg leading-tight">
                {title}
              </h6>
            )}
            {subtitle && (
              <p className="text-body dark:text-white/60 text-sm mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={cn("p-6", title && "pt-5")}>{children}</div>
    </div>
  );
}
