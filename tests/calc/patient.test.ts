import { describe, it, expect } from "vitest";
import { calcBMI, calcIBW, calcABW, calcBSA } from "@/lib/calc/patient";

describe("patient calculations", () => {
  it("calculates BMI correctly", () => {
    expect(calcBMI(70, 175)).toBeCloseTo(22.9, 1);
  });

  it("calculates Devine IBW for males", () => {
    // 70 inches → 50 + 2.3*10 = 73 kg
    expect(calcIBW(177.8, "male")).toBeCloseTo(73, 0);
  });

  it("calculates Devine IBW for females", () => {
    // 65 inches → 45.5 + 2.3*5 = 57 kg
    expect(calcIBW(165.1, "female")).toBeCloseTo(57, 0);
  });

  it("returns actual weight when below IBW", () => {
    expect(calcABW(60, 70)).toBe(60);
  });

  it("calculates ABW = IBW + 0.4*(ABW - IBW)", () => {
    expect(calcABW(100, 70)).toBeCloseTo(82, 1);
  });

  it("calculates BSA via Mosteller", () => {
    expect(calcBSA(70, 175)).toBeCloseTo(1.84, 2);
  });
});
