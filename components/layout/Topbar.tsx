"use client";

import { Menu, Moon, Sun, Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  onOpenSidebar: () => void;
  title: string;
  breadcrumb?: string;
}

export function Topbar({
  darkMode,
  setDarkMode,
  onOpenSidebar,
  title,
  breadcrumb,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-page dark:bg-dark-page py-4">
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-dark-card rounded-2xl shadow-navbar dark:shadow-soft-dark px-5 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-lg text-body dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
          <div className="min-w-0">
            {breadcrumb && (
              <p className="text-xs text-muted dark:text-white/40 truncate">
                {breadcrumb}
              </p>
            )}
            <h1 className="text-lg font-bold text-dark dark:text-white leading-tight truncate">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center bg-page dark:bg-white/5 rounded-lg px-3 py-2 w-72">
            <Search size={14} className="text-muted dark:text-white/40 mr-2" />
            <input
              type="text"
              placeholder="Search drugs, patients…"
              className="bg-transparent outline-none text-sm text-body dark:text-white/80 placeholder:text-muted dark:placeholder:text-white/40 w-full"
            />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={cn(
              "p-2 rounded-lg text-body dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5",
            )}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="relative p-2 rounded-lg text-body dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gradient-danger" />
          </button>
          <div className="hidden sm:flex items-center gap-3 pl-3 ml-1 border-l border-light dark:border-white/10">
            <div className="text-right">
              <p className="text-xs font-bold text-dark dark:text-white leading-tight">
                Dr. Reynaldo Dizon
              </p>
              <p className="text-xs text-muted dark:text-white/40 leading-tight">
                Anesthesiologist
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-info shadow-info flex items-center justify-center text-white text-xs font-bold">
              RD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
