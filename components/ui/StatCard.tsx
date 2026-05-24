import type { StatCardProps } from "./types/card-types";
import { cn } from "@/lib/utils";

const TONE_CLASS: Record<NonNullable<StatCardProps["deltaTone"]>, string> = {
  success: "text-success",
  danger: "text-danger",
  info: "text-info",
  warning: "text-warning",
};

export function StatCard({
  label,
  value,
  delta,
  deltaTone = "success",
  icon,
  iconGradient = "bg-gradient-primary shadow-primary",
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl shadow-soft dark:shadow-soft-dark p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-body dark:text-white/60 uppercase tracking-wide font-bold mb-1">
            {label}
          </p>
          <h4 className="text-2xl font-bold text-dark dark:text-white leading-tight">
            {value}
          </h4>
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0",
            iconGradient,
          )}
        >
          {icon}
        </div>
      </div>
      {delta && (
        <>
          <hr className="my-3 border-light dark:border-white/10" />
          <p className="text-sm text-body dark:text-white/60">
            <span className={cn("font-bold", TONE_CLASS[deltaTone])}>{delta}</span>{" "}
            vs. last week
          </p>
        </>
      )}
    </div>
  );
}
