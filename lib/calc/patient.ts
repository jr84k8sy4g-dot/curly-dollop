export function calcBMI(weightKg: number, heightCm: number): number {
  if (heightCm <= 0) return 0;
  const m = heightCm / 100;
  return roundTo(weightKg / (m * m), 1);
}

export function calcIBW(
  heightCm: number,
  gender: "male" | "female",
): number {
  const heightIn = heightCm / 2.54;
  const over60 = Math.max(0, heightIn - 60);
  const base = gender === "male" ? 50 : 45.5;
  return roundTo(base + 2.3 * over60, 1);
}

export function calcABW(
  weightKg: number,
  ibwKg: number,
  factor = 0.4,
): number {
  if (weightKg <= ibwKg) return roundTo(weightKg, 1);
  return roundTo(ibwKg + factor * (weightKg - ibwKg), 1);
}

export function calcBSA(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  return roundTo(Math.sqrt((heightCm * weightKg) / 3600), 2);
}

export function roundTo(value: number, digits: number): number {
  const f = 10 ** digits;
  return Math.round(value * f) / f;
}
