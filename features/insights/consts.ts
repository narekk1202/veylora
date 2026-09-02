import { PredictionAccuracy } from "@/shared/generated/prisma/enums";

export const CONFIDENCE_BINS = [0, 20, 40, 60, 80, 100] as const;

export const CALIBRATION_GAP_THRESHOLD = 5;

export const POSITIVE_ACCURACIES: PredictionAccuracy[] = [
  PredictionAccuracy.ACCURATE,
  PredictionAccuracy.MOSTLY_ACCURATE,
];
