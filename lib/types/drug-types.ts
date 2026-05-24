export type Route =
  | "IV"
  | "IM"
  | "PO"
  | "SC"
  | "SL"
  | "PR"
  | "Inhaled"
  | "Topical"
  | "Epidural"
  | "Intrathecal";

export type DrugCategory =
  | "Anesthetic"
  | "Analgesic"
  | "Antibiotic"
  | "Cardiovascular"
  | "Sedative"
  | "Neuromuscular Blocker"
  | "Vasopressor"
  | "Antiemetic"
  | "Anticoagulant"
  | "Bronchodilator"
  | "Antiarrhythmic"
  | "Diuretic"
  | "Electrolyte";

export type DosingBasis = "weight" | "bsa" | "fixed" | "age";

export interface DoseRange {
  min: number;
  max: number;
  unit: string;
  basis: DosingBasis;
}

export interface InfusionProfile {
  defaultConcentration: number;
  concentrationUnit: string;
  diluent: string;
  defaultRateUnit: "mcg/kg/min" | "mcg/min" | "mg/kg/hr" | "mg/hr" | "units/hr";
}

export interface Drug {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  category: DrugCategory;
  defaultRoute: Route;
  routes: Route[];
  concentration: string;
  adultDose: DoseRange;
  pediatricDose?: DoseRange;
  maxSingleDose?: { value: number; unit: string };
  maxDailyDose?: { value: number; unit: string };
  indications: string[];
  contraindications: string[];
  warnings: string[];
  interactions: string[];
  mechanism: string;
  monitoring: string[];
  renalAdjustment?: {
    threshold: number;
    reduction: number;
    note: string;
  };
  hepaticAdjustment?: {
    reduction: number;
    note: string;
  };
  infusion?: InfusionProfile;
  references: string[];
}

export interface Patient {
  id: string;
  name: string;
  weightKg: number;
  heightCm: number;
  age: number;
  gender: "male" | "female";
  bmi?: number;
  ibwKg?: number;
  abwKg?: number;
  bsaM2?: number;
  egfr?: number;
  hepaticImpairment?: "none" | "mild" | "moderate" | "severe";
  allergies: string[];
  conditions: string[];
  currentMedications: string[];
}
