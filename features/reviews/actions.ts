"use server";

import { DecisionStatus, ReviewStatus } from "@/shared/generated/prisma/enums";
import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { completeReviewSchema, CompleteReviewSchema } from "./schemas";

export async function completeReview(
  reviewId: string,
  data: CompleteReviewSchema,
) {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  const validated = completeReviewSchema.safeParse(data);

  if (!validated.success) {
    const errors = z.flattenError(validated.error);
    return {
      success: false,
      errors,
    };
  }

  try {
    await prisma.review.update({
      where: {
        id: reviewId,
        userId,
      },
      data: {
        status: ReviewStatus.COMPLETED,
        outcomeSummary: validated.data.outcome,
        accuracy: validated.data.accuracy,
        surprises: validated.data.surprises,
        lessonsLearned: validated.data.lessons,
        wouldDoDifferently: validated.data.wouldDoDifferently,
        decision: {
          update: {
            reviewedAt: new Date(),
            status: DecisionStatus.REVIEWED,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: {
        root: "Failed to complete review",
      },
    };
  }

  revalidatePath(`/decisions`);
  revalidatePath("/reviews");

  redirect(`/reviews`);
}
