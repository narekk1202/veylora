import { ReviewStatus } from "@/shared/generated/prisma/enums";
import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { redirect } from "next/navigation";
import type { ReviewFilters } from "./schemas";

const DUE_NOW_STATUSES = [ReviewStatus.DUE, ReviewStatus.OVERDUE] as const;

function reviewStatusWhere(status: ReviewFilters["status"]) {
  switch (status) {
    case "due":
      return { status: { in: [...DUE_NOW_STATUSES] } };
    case "upcoming":
      return { status: ReviewStatus.UPCOMING };
    case "completed":
      return { status: ReviewStatus.COMPLETED };
    default:
      return {};
  }
}

export async function getReviews(filters?: ReviewFilters) {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  return prisma.review.findMany({
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
}

export async function getDueReviewCount() {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  return prisma.review.count({
    where: {
      userId,
      status: { in: [...DUE_NOW_STATUSES] },
    },
  });
}

export async function getReview(id: string) {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  return prisma.review.findUnique({
    where: { id, userId },
    include: {
      decision: true,
    },
  });
}
