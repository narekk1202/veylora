import { Decision, Review } from "@/shared/generated/prisma/client";
import { Category } from "@/shared/generated/prisma/enums";

export type OverviewReview = Review & {
  decision: Pick<
    Decision,
    "id" | "question" | "category" | "createdAt" | "confidence" | "reviewDate"
  >;
};

export type OverviewDecision = Pick<
  Decision,
  "id" | "question" | "category" | "createdAt"
>;

export type AccuracyTrendPoint = {
  month: string;
  accuracy: number | null;
};

export type CategoryCount = {
  category: Category;
  count: number;
};

export type OverviewMetrics = {
  decisions: number;
  reviewed: number;
  avgConfidence: number;
  accuracy: number | null;
  trend: AccuracyTrendPoint[];
  categories: CategoryCount[];
};

export type OverviewData = {
  upcomingReviews: OverviewReview[];
  recentDecisions: OverviewDecision[];
  metrics: OverviewMetrics;
};
