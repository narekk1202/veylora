import type { CategoryKey } from "@/shared/constants/catergories.consts";
import type { PredictionAccuracy } from "@/shared/generated/prisma/enums";

export type ReviewTab = "all" | "due" | "upcoming" | "completed";

export type PendingReview = {
  id: string;
  question: string;
  category: CategoryKey;
  lockedAt: Date;
  reviewDate: Date;
  confidence: number;
  urgency: "due" | "upcoming";
};

export type CompletedReview = {
  id: string;
  question: string;
  category: CategoryKey;
  reviewedAt: Date;
  accuracy: PredictionAccuracy;
};
