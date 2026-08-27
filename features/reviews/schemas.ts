import { PredictionAccuracy } from "@/shared/generated/prisma/enums";
import z from "zod";

const firstQueryValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const REVIEW_STATUS_FILTERS = ["due", "upcoming", "completed"] as const;

export const reviewStatusFilterSchema = z.enum(REVIEW_STATUS_FILTERS);

export type ReviewStatusFilter = z.infer<typeof reviewStatusFilterSchema>;

export type ReviewFilters = {
  status?: ReviewStatusFilter;
};

export type ReviewSearchParams = {
  status?: string | string[];
};

export function parseReviewFilters(raw: ReviewSearchParams): ReviewFilters {
  const status = reviewStatusFilterSchema.safeParse(
    firstQueryValue(raw.status),
  );

  return {
    ...(status.success ? { status: status.data } : {}),
  };
}

export const completeReviewSchema = z.object({
  outcome: z.string().min(1, "Actual outcome is required"),
  accuracy: z.enum(PredictionAccuracy, { error: "Accuracy is required" }),
  surprises: z.string().min(1, "Surprises are required"),
  lessons: z.string().min(1, "Lessons are required"),
  wouldDoDifferently: z.string().min(1, "Would do differently is required"),
});

export type CompleteReviewSchema = z.infer<typeof completeReviewSchema>;
