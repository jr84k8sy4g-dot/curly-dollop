export type WeightUnit = "kg" | "lb";
export type HeightUnit = "cm" | "in";
export type ConcentrationUnit = "metric" | "imperial";
export type DateFormat = "iso" | "us" | "eu";
export type Theme = "light" | "dark" | "system";

export interface ClinicianProfile {
  fullName: string;
  email: string;
  role: "physician" | "pharmacist" | "nurse" | "admin" | "auditor";
  licenseNumber: string;
  department: string;
}

export interface UnitPreferences {
  weight: WeightUnit;
  height: HeightUnit;
  concentration: ConcentrationUnit;
  dateFormat: DateFormat;
}

export interface SafetyPreferences {
  confirmHighRiskDoses: boolean;
  blockOnAllergyMatch: boolean;
  showRenalAdjustmentBanner: boolean;
  showHepaticAdjustmentBanner: boolean;
  pediatricDoubleCheck: boolean;
}

export interface NotificationPreferences {
  emailDaily: boolean;
  emailWeekly: boolean;
  inAppCritical: boolean;
  inAppWarnings: boolean;
  smsCritical: boolean;
}

export interface AppearancePreferences {
  theme: Theme;
  sidebarCompact: boolean;
  reducedMotion: boolean;
}

export interface AccountSettings {
  profile: ClinicianProfile;
  units: UnitPreferences;
  safety: SafetyPreferences;
  notifications: NotificationPreferences;
  appearance: AppearancePreferences;
}
