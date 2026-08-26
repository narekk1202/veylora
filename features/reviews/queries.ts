import { ReviewStatus } from "@/shared/generated/prisma/enums";
import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { startOfDay } from "date-fns";
import { redirect } from "next/navigation";
import type { ReviewFilters } from "./schemas";
import type { ReviewWithDecision } from "./types";
import { deriveReviewStatus } from "./utils";

function reviewStatusWhere(status: ReviewFilters["status"], now = new Date()) {
  const today = startOfDay(now);

  switch (status) {
    case "due":
      return {
        status: { not: ReviewStatus.COMPLETED },
        decision: { reviewDate: { lte: today } },
      };
    case "upcoming":
      return {
        status: { not: ReviewStatus.COMPLETED },
        decision: { reviewDate: { gt: today } },
      };
    case "completed":
      return { status: ReviewStatus.COMPLETED };
    default:
      return {};
  }
}

function withDerivedStatus(review: ReviewWithDecision): ReviewWithDecision {
  return { ...review, status: deriveReviewStatus(review) };
}

export async function getReviews(filters?: ReviewFilters) {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  const reviews = await prisma.review.findMany({
    where: {
      userId,
      ...reviewStatusWhere(filters?.status),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      decision: true,
    },
  });

  return reviews.map(withDerivedStatus);
}

export async function getDueReviewCount() {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  return prisma.review.count({
    where: {
      userId,
      ...reviewStatusWhere("due"),
    },
  });
}

export async function getReview(id: string) {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  const review = await prisma.review.findUnique({
    where: { id, userId },
    include: {
      decision: true,
    },
  });

  return review ? withDerivedStatus(review) : null;
}
