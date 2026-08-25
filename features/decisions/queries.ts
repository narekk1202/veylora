import { Decision } from "@/shared/generated/prisma/client";
import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { redirect } from "next/navigation";

type GetDecisionsResult =
  | {
      success: true;
      decisions: Decision[];
    }
  | {
      success: false;
      error: string;
    };

export async function getDecisions(): Promise<GetDecisionsResult> {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  try {
    const decisions = await prisma.decision.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, decisions };
  } catch (error) {
    console.error("Failed to get decisions:", error);
    return {
      success: false,
      error: "Failed to get decisions",
    };
  }
}
