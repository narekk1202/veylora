import { deriveReviewStatus } from "@/features/reviews/utils";
import { DecisionStatus, ReviewStatus } from "@/shared/generated/prisma/enums";
import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { redirect } from "next/navigation";
import { RECENT_DECISIONS_LIMIT, UPCOMING_REVIEWS_LIMIT } from "./consts";
import type { CategoryCount, OverviewData } from "./types";
import { calculateAccuracyScore, calculateAccuracyTrend } from "./utils";

export async function getOverview(): Promise<OverviewData> {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  const [
    totals,
    upcomingReviews,
    recentDecisions,
    categoryGroups,
    reviewedDecisions,
  ] = await Promise.all([
    prisma.decision.aggregate({
      where: { userId },
      _count: { _all: true },
      _avg: { confidence: true },
    }),
    prisma.review.findMany({
      where: {
        userId,
        status: { not: ReviewStatus.COMPLETED },
      },
      orderBy: {
        decision: {
          reviewDate: "asc",
        },
      },
      take: UPCOMING_REVIEWS_LIMIT,
      include: {
        decision: {
          select: {
            id: true,
            question: true,
            category: true,
            createdAt: true,
            confidence: true,
            reviewDate: true,
          },
        },
      },
    }),
    prisma.decision.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: RECENT_DECISIONS_LIMIT,
      select: {
        id: true,
        question: true,
        category: true,
        createdAt: true,
      },
    }),
    prisma.decision.groupBy({
      by: ["category"],
      where: { userId },
      _count: { _all: true },
      orderBy: {
        _count: {
          category: "desc",
        },
      },
    }),
    prisma.decision.findMany({
      where: {
        userId,
        status: DecisionStatus.REVIEWED,
        review: {
          status: ReviewStatus.COMPLETED,
          accuracy: { not: null },
        },
      },
      select: {
        reviewedAt: true,
        review: {
          select: {
            accuracy: true,
            updatedAt: true,
          },
        },
      },
    }),
  ]);

  const completed = reviewedDecisions.flatMap((decision) => {
    if (!decision.review) return [];
    return [
      {
        reviewedAt: decision.reviewedAt ?? decision.review.updatedAt,
        accuracy: decision.review.accuracy,
      },
    ];
  });

  const categories: CategoryCount[] = categoryGroups.map((group) => ({
    category: group.category,
    count: group._count._all,
  }));

  return {
    upcomingReviews: upcomingReviews.map((review) => ({
      ...review,
      status: deriveReviewStatus(review),
    })),
    recentDecisions,
    metrics: {
      decisions: totals._count._all,
      reviewed: completed.length,
      avgConfidence: Math.round(totals._avg.confidence ?? 0),
      accuracy: calculateAccuracyScore(
        completed.map((review) => review.accuracy),
      ),
      trend: calculateAccuracyTrend(completed),
      categories,
    },
  };
}
