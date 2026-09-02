import { ACCURACY_PERCENTAGES } from "@/shared/constants/accuracy.consts";
import { PredictionAccuracy } from "@/shared/generated/prisma/enums";

export function mean(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function roundedMean(values: number[]) {
  return Math.round(mean(values));
}

export function accuracyPercent(accuracy: PredictionAccuracy | null) {
  if (!accuracy) return 0;
  return ACCURACY_PERCENTAGES[accuracy];
}
