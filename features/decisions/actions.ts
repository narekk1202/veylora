"use server";

import {
  newDecisionSchema,
  NewDecisionSchema,
  postHocNotesSchema,
} from "@/features/decisions/schemas";
import { toDecisionOptionCreates } from "@/features/decisions/utils";
import { getUserId } from "@/shared/lib/auth/utils";
import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { SavePostHocNotesState } from "./types";

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

export async function savePostHocNotes(
  _: SavePostHocNotesState,
  formData: FormData,
): Promise<SavePostHocNotesState> {
  const validated = postHocNotesSchema.safeParse({
    decisionId: formData.get("decisionId"),
    postHocNotes: formData.get("postHocNotes"),
  });

  if (!validated.success) {
    return { status: "error", message: "Unable to save notes." };
  }

  const userId = await getUserId();

  if (!userId) {
    return { status: "error", message: "Unauthorized" };
  }

  try {
    const result = await prisma.decision.updateMany({
      where: {
        id: validated.data.decisionId,
        userId,
      },
      data: {
        postHocNotes: validated.data.postHocNotes,
      },
    });
    if (result.count === 0) {
      return {
        status: "error",
        message: "Decision not found or unauthorized.",
      };
    }
  } catch (error) {
    console.error("Failed to save post-hoc notes:", error);
    return { status: "error", message: "Failed to save notes." };
  }

  revalidatePath(`/decisions/${validated.data.decisionId}`);
  return { status: "success" };
}

export async function deleteDecision(id: string) {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  try {
    const result = await prisma.decision.deleteMany({
      where: { id, userId },
    });

    if (result.count === 0) {
      return {
        status: "error",
        message: "Decision not found or unauthorized.",
      };
    }
  } catch (error) {
    console.error("Failed to delete decision:", error);
    return { status: "error", message: "Failed to delete decision." };
  }

  revalidatePath("/decisions");
  redirect("/decisions");
}
