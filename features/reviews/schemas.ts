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
  const status = reviewStatusFilterSchema.safeParse(firstQueryValue(raw.status));

  return {
    ...(status.success ? { status: status.data } : {}),
  };
}
