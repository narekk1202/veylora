import { Decision, Review } from "@/shared/generated/prisma/client";

export type DecisionsWithReviews = Decision & {
  review: Review;
};
