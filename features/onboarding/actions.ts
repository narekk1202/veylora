"use server";

import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function completeOnboarding(redirectTo: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/login");
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { onboardingCompleted: true },
    });
  } catch (error) {
    console.error("Failed to complete onboarding:", error);
    throw new Error("Failed to update onboarding status.");
  }

  revalidatePath("/", "layout");

  redirect(redirectTo);
}

export async function endOnboarding() {
  await completeOnboarding("/decisions/new");
}

export async function skipOnboarding() {
  await completeOnboarding("/overview");
}
