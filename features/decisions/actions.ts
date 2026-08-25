"use server";

import {
  newDecisionSchema,
  NewDecisionSchema,
} from "@/features/decisions/schemas";
import { toDecisionOptionCreates } from "@/features/decisions/utils";
import { getUserId } from '@/shared/lib/auth/utils'
import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

type CreateDecisionResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: ReturnType<typeof z.flattenError>;
    };

export async function createDecision(
  decision: NewDecisionSchema,
): Promise<CreateDecisionResult> {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  const validated = newDecisionSchema.safeParse(decision);

  if (!validated.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: z.flattenError(validated.error),
    };
  }

  const selectedExists = validated.data.options.some(
    (option) => option.id === validated.data.selectedOptionId,
  );

  if (!selectedExists) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: {
        formErrors: [],
        fieldErrors: {
          selectedOptionId: [
            "Selected option must be one of the considered options",
          ],
        },
      },
    };
  }

  try {
    await prisma.decision.create({
      data: {
        userId,
        status: "LOCKED",
        category: validated.data.category,
        question: validated.data.question,
        context: validated.data.context,
        urgency: validated.data.urgency,
        primaryReasons: validated.data.primaryReasons,
        potentialConcerns: validated.data.potentialConcerns,
        assumptions: validated.data.assumptions,
        predictions: validated.data.predictions,
        confidence: validated.data.confidence,
        reviewDate: validated.data.reviewDate,
        options: {
          create: toDecisionOptionCreates(
            validated.data.options,
            validated.data.selectedOptionId,
          ),
        },
      },
    });
  } catch (error) {
    console.error("Failed to create decision:", error);
    return {
      success: false,
      error: "Failed to create decision",
    };
  }

  revalidatePath("/decisions");
  return { success: true };
}
