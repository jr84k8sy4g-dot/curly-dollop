import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import type { ClinicalWarning } from "@/lib/types/calc-types";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  critical: <ShieldAlert size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

const STYLE = {
  critical:
    "bg-gradient-danger shadow-danger text-white",
  warning:
    "bg-gradient-warning shadow-warning text-white",
  info: "bg-gradient-info shadow-info text-white",
};

export function Alert({ w, className }: { w: ClinicalWarning; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl px-4 py-3 flex items-start gap-3 animate-fade-in-up",
        STYLE[w.severity],
        className,
      )}
    >
      <div className="mt-0.5 shrink-0">{ICON_MAP[w.severity]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold uppercase tracking-wide">{w.title}</p>
        <p className="text-sm mt-1 leading-relaxed text-white/90">{w.message}</p>
      </div>
    </div>
  );
}
