"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU, SECTIONS } from "@/lib/menus";
import { cn } from "@/lib/utils";

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/40 lg:hidden transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-dark-page transition-transform duration-300 shadow-soft dark:shadow-soft-dark",
          "lg:translate-x-0 lg:sticky lg:top-0 lg:shadow-none",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary shadow-primary flex items-center justify-center text-white font-bold">
            Rx
          </div>
          <div>
            <p className="text-sm font-bold text-dark dark:text-white leading-tight">
              CDSS
            </p>
            <p className="text-xs text-muted dark:text-white/40 leading-tight">
              Dosage Platform
            </p>
          </div>
        </div>
        <hr className="border-light dark:border-white/10 mx-6 mb-4" />

        <nav className="px-3 pb-6 space-y-1">
          {SECTIONS.map((section) => {
            const items = MENU.filter((m) => m.section === section);
            if (items.length === 0) return null;
            return (
              <div key={section} className="mt-3">
                <p className="text-[0.65rem] font-bold uppercase tracking-wide text-muted dark:text-white/40 px-4 mt-3 mb-2">
                  {section}
                </p>
                {items.map((m) => {
                  const active =
                    pathname === m.href ||
                    pathname.startsWith(m.href.split("#")[0]!);
                  const Icon = m.icon;
                  return (
                    <Link
                      key={m.href}
                      href={m.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all",
                        active
                          ? "bg-gradient-primary shadow-primary text-white"
                          : "text-body dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5",
                      )}
                    >
                      <Icon size={16} />
                      {m.label}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="rounded-2xl bg-gradient-dark text-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">
              Compliance
            </p>
            <p className="text-sm font-bold mt-1">HIPAA · SOC 2 · HL7 FHIR</p>
            <p className="text-xs text-white/60 mt-2">
              All actions are auditable.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
