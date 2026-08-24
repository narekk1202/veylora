import {
  NewDecisionSchema,
  newDecisionSchema,
} from "@/features/decisions/schemas";
import { toDecisionOptionCreates } from "@/features/decisions/utils";
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  let body: { decision: NewDecisionSchema };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const validated = newDecisionSchema.safeParse(body?.decision);

  if (!validated.success) {
    const fieldErrors = z.flattenError(validated.error);
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const selectedExists = validated.data.options.some(
    (option) => option.id === validated.data.selectedOptionId,
  );

  if (!selectedExists) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        fieldErrors: {
          fieldErrors: {
            selectedOptionId: ["Selected option must be one of the considered options"],
          },
        },
      },
      { status: 400 },
    );
  }

  try {
    const newDecision = await prisma.decision.create({
      data: {
        userId: session.user.id,
        status: "LOCKED",
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
      include: {
        options: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: newDecision,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create decision:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create decision" },
      { status: 500 },
    );
  }
}
