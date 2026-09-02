import { PredictionAccuracy } from "@/shared/generated/prisma/enums";

export const ACCURACY_PERCENTAGES: Record<PredictionAccuracy, number> = {
  [PredictionAccuracy.INACCURATE]: 0,
  [PredictionAccuracy.MOSTLY_INACCURATE]: 25,
  [PredictionAccuracy.PARTIALLY_ACCURATE]: 50,
  [PredictionAccuracy.MOSTLY_ACCURATE]: 75,
  [PredictionAccuracy.ACCURATE]: 100,
} as const;
