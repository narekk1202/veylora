import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { redirect } from "next/navigation";

export async function getInsights() {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  const data = await prisma.decision.findMany({
    where: {
      userId,
    },
    include: {
      review: true,
    },
  });

  return data;
}
