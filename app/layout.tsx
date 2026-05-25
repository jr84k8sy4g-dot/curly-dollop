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
      <body>
        <div
          role="alert"
          className="bg-amber-100 border-b border-amber-300 text-amber-900 text-xs sm:text-sm text-center px-4 py-2 font-medium"
        >
          <strong>Demo / educational use only.</strong> Not a medical device. Do not use for real clinical decisions.
        </div>
        {children}
      </body>
    </html>
  );
}
