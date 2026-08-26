import type { CategoryKey } from "@/shared/constants/catergories.consts";
import type { PredictionAccuracy } from "@/shared/generated/prisma/enums";

export type ReviewTab = "all" | "due" | "upcoming" | "completed";

export type ReviewAccuracyChoice =
  | "completely_wrong"
  | "partially_accurate"
  | "mostly_accurate"
  | "completely_accurate";

export type PendingReview = {
  id: string;
  question: string;
  category: CategoryKey;
  lockedAt: Date;
  reviewDate: Date;
  confidence: number;
  urgency: "due" | "upcoming";
  predictions: string;
};

export type CompletedReview = {
  id: string;
  question: string;
  category: CategoryKey;
  reviewedAt: Date;
  accuracy: PredictionAccuracy;
};

export type ReviewFormState = {
  actualOutcome: string;
  accuracy: ReviewAccuracyChoice | null;
  surprise: string;
  learned: string;
  differently: string;
};
