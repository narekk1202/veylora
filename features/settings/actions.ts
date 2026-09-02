"use server";

import { getUserId } from "@/shared/lib/auth/utils";
import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { REMINDER_FIELDS } from "./consts";
import {
  updateProfileSchema,
  updateReminderSchema,
  type UpdateProfileSchema,
  type UpdateReminderSchema,
} from "./schemas";
import type { SettingsActionResult } from "./types";

export async function updateProfile(
  data: UpdateProfileSchema,
): Promise<SettingsActionResult> {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  const validated = updateProfileSchema.safeParse(data);

  if (!validated.success) {
    const { fieldErrors, formErrors } = z.flattenError(validated.error);
    return {
      success: false,
      error: fieldErrors.name?.[0] ?? formErrors[0] ?? "Invalid name",
    };
  }

  try {
    await auth.api.updateUser({
      body: { name: validated.data.name },
      headers: await headers(),
    });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return {
      success: false,
      error: "Failed to update name",
    };
  }

  revalidatePath("/", "layout");
  revalidatePath("/settings");
  return { success: true };
}

export async function updateReminder(
  data: UpdateReminderSchema,
): Promise<SettingsActionResult> {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  const validated = updateReminderSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      error: "Invalid reminder preference",
    };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        [REMINDER_FIELDS[validated.data.id]]: validated.data.enabled,
      },
    });

    await auth.api.getSession({
      headers: await headers(),
      query: { disableCookieCache: true },
    });
  } catch (error) {
    console.error("Failed to update reminder preference:", error);
    return {
      success: false,
      error: "Failed to update reminder preference",
    };
  }

  revalidatePath("/settings");
  return { success: true };
}

export async function deleteAccount(): Promise<SettingsActionResult> {
  const userId = await getUserId();

  if (!userId) redirect("/login");

  const requestHeaders = await headers();

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    console.error("Failed to delete account:", error);
    return {
      success: false,
      error: "Failed to delete account",
    };
  }

  try {
    await auth.api.signOut({
      headers: requestHeaders,
    });
  } catch (error) {
    console.error("Failed to sign out after account deletion:", error);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
