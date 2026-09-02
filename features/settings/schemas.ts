import z from "zod";
import { REMINDER_TOGGLE_IDS } from "./consts";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(80, { message: "Name must be 80 characters or fewer" })
    .regex(/^[^0-9]*$/, {
      message: "Numbers are not allowed",
    }),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export const reminderIdSchema = z.enum(REMINDER_TOGGLE_IDS);

export const updateReminderSchema = z.object({
  id: reminderIdSchema,
  enabled: z.boolean(),
});

export type UpdateReminderSchema = z.infer<typeof updateReminderSchema>;
