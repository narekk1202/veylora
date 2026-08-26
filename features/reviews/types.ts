import type { CategoryKey } from "@/shared/constants/catergories.consts";
import type { PredictionAccuracy } from "@/shared/generated/prisma/enums";

export type ReviewTab = "all" | "due" | "upcoming" | "completed";

export type ReviewAccuracyChoice =
  | "completely_wrong"
  | "partially_accurate"
  | "mostly_accurate"
  | "completely_accurate";

export type DecisionSummary = {
  question: string;
  category: CategoryKey;
  lockedAt: Date;
  confidence: number;
  predictions: string;
};

export type PendingReview = DecisionSummary & {
  id: string;
  reviewDate: Date;
  urgency: "due" | "upcoming";
};

export type CompletedReview = DecisionSummary & {
  id: string;
  reviewedAt: Date;
  accuracy: PredictionAccuracy;
  actualOutcome: string;
  surprise: string;
  learned: string;
  differently: string;
};

export type ReviewFormState = {
  actualOutcome: string;
  accuracy: ReviewAccuracyChoice | null;
  surprise: string;
  learned: string;
  differently: string;
};
