import { roundTo } from "./patient";

export interface InfusionInput {
  doseMcgKgMin: number;
  weightKg: number;
  concentrationMcgPerMl: number;
  durationMinutes?: number;
  dropFactor?: number;
}

export interface InfusionOutput {
  mlPerHour: number;
  totalVolumeMl?: number;
  dropsPerMinute?: number;
}

export function infusionRate(input: InfusionInput): InfusionOutput {
  const mcgPerMin = input.doseMcgKgMin * input.weightKg;
  const mlPerMin = mcgPerMin / input.concentrationMcgPerMl;
  const mlPerHour = roundTo(mlPerMin * 60, 2);

  const out: InfusionOutput = { mlPerHour };

  if (input.durationMinutes && input.durationMinutes > 0) {
    out.totalVolumeMl = roundTo(mlPerMin * input.durationMinutes, 2);
    const drop = input.dropFactor ?? 20;
    out.dropsPerMinute = roundTo(mlPerMin * drop, 1);
  }
  return out;
}
