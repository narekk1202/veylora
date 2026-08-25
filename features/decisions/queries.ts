import { Category, DecisionStatus } from "@/shared/generated/prisma/enums";
import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { redirect } from "next/navigation";

type GetDecisionsFilters = {
  search?: string;
  status?: DecisionStatus;
  category?: Category;
};

export async function getDecisions(filters?: GetDecisionsFilters) {
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
