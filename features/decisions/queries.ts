import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { redirect } from "next/navigation";
import type { DecisionFilters } from "./schemas";

export async function getDecisions(filters?: DecisionFilters) {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  return prisma.decision.findMany({
    where: {
      userId,
      ...(filters?.search
        ? {
            question: {
              contains: filters.search,
              mode: "insensitive",
            },
          }
        : {}),
      ...(filters?.status ? { status: filters.status } : {}),
      ...(filters?.category ? { category: filters.category } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
