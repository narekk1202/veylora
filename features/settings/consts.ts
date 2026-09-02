export const REMINDER_TOGGLES = [
  {
    id: "email-due",
    title: "Email when a review is due",
    description:
      "Get notified on the day a locked decision is ready to revisit.",
    defaultChecked: true,
  },
  {
    id: "weekly-digest",
    title: "Weekly reflection digest",
    description: "A quiet Sunday summary of upcoming reviews and insights.",
    defaultChecked: false,
  },
] as const;

export const EXPORT_ACTIONS = [
  {
    id: "decisions-excel",
    label: "Export all decisions (Excel)",
  },
  {
    id: "journal-markdown",
    label: "Export journal (Markdown)",
  },
] as const;
