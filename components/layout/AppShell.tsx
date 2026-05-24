"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppShellProps {
  children: ReactNode;
  title: string;
  breadcrumb?: string;
}

export function AppShell({ children, title, breadcrumb }: AppShellProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("cdss-dark") : null;
    if (saved === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cdss-dark", String(darkMode));
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-page dark:bg-dark-page transition-colors duration-300">
        <div className="flex">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 min-w-0 px-4 md:px-8 lg:pl-8 lg:pr-8 pb-12">
            <Topbar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onOpenSidebar={() => setSidebarOpen(true)}
              title={title}
              breadcrumb={breadcrumb}
            />
            <div className="pt-2 animate-fade-in-up">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
