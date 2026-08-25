import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { redirect } from "next/navigation";

export async function getDecisions() {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  return prisma.decision.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
