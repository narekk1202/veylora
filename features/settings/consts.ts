export const REMINDER_TOGGLE_IDS = ["email-due", "weekly-digest"] as const;

export type ReminderToggleId = (typeof REMINDER_TOGGLE_IDS)[number];

export const REMINDER_FIELDS = {
  "email-due": "emailDueReminders",
  "weekly-digest": "weeklyDigest",
} as const satisfies Record<
  ReminderToggleId,
  "emailDueReminders" | "weeklyDigest"
>;

export const REMINDER_TOGGLES = [
  {
    id: "email-due",
    title: "Email when a review is due",
    description:
      "Get notified on the day a locked decision is ready to revisit.",
  },
  {
    id: "weekly-digest",
    title: "Weekly reflection digest",
    description: "A quiet Sunday summary of upcoming reviews and insights.",
  },
] as const satisfies ReadonlyArray<{
  id: ReminderToggleId;
  title: string;
  description: string;
}>;

export const EXPORT_ACTIONS = [
  {
    id: "decisions-excel",
    label: "Export all decisions (Excel)",
    href: "/api/settings/export/decisions-excel",
    filename: "veylora-decisions.csv",
  },
  {
    id: "journal-markdown",
    label: "Export journal (Markdown)",
    href: "/api/settings/export/journal-markdown",
    filename: "veylora-journal.md",
  },
] as const;
