import type { AccountSettings } from "@/lib/types/settings-types";

export const DEFAULT_SETTINGS: AccountSettings = {
  profile: {
    fullName: "Dr. Reynaldo Dizon",
    email: "r.dizon@cdss.example",
    role: "physician",
    licenseNumber: "PHL-12345-A",
    department: "Anesthesiology",
  },
  units: {
    weight: "kg",
    height: "cm",
    concentration: "metric",
    dateFormat: "iso",
  },
  safety: {
    confirmHighRiskDoses: true,
    blockOnAllergyMatch: true,
    showRenalAdjustmentBanner: true,
    showHepaticAdjustmentBanner: true,
    pediatricDoubleCheck: true,
  },
  notifications: {
    emailDaily: false,
    emailWeekly: true,
    inAppCritical: true,
    inAppWarnings: true,
    smsCritical: false,
  },
  appearance: {
    theme: "system",
    sidebarCompact: false,
    reducedMotion: false,
  },
};
