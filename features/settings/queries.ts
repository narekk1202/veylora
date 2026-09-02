import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";

export async function getExportDecisions() {
  const userId = await getUserId();

  if (!userId) return null;

  return prisma.decision.findMany({
    where: { userId },
    include: {
      options: {
        orderBy: {
          sortOrder: "asc",
        },
      },
      review: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
