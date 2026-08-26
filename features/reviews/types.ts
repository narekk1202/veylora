import { Decision, Review } from "@/shared/generated/prisma/client";

export type ReviewsWithDecisions = Review[] & { decision: Decision[] };
export type ReviewWithDecision = Review & { decision: Decision };
