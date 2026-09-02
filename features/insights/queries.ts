import { DecisionStatus, ReviewStatus } from "@/shared/generated/prisma/enums";
import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { redirect } from "next/navigation";
import type { DecisionWithReview } from "./types";

export async function getInsights(): Promise<DecisionWithReview[]> {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  const decisions = await prisma.decision.findMany({
    where: {
      userId,
      status: DecisionStatus.REVIEWED,
      review: {
        status: ReviewStatus.COMPLETED,
        accuracy: { not: null },
      },
    },
    include: {
      review: true,
    },
    orderBy: {
      reviewedAt: "asc",
    },
  });

  return decisions.filter(
    (decision): decision is DecisionWithReview =>
      decision.review !== null && decision.review.accuracy !== null,
  );
}
