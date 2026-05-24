import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CDSS — Drug Dosage Calculation Platform",
  description:
    "Hospital-grade Clinical Decision Support System for drug dosage calculation, infusion management, and patient safety.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
