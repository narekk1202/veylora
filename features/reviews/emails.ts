import {
  escapeHtml,
  renderEmailLayout,
  type EmailContent,
} from "@/shared/lib/email/layout";

export function reviewDueEmail(input: {
  name?: string | null;
  question: string;
  url: string;
}): EmailContent {
  const greeting = input.name?.trim() ? `Hi ${input.name.trim()},` : "Hi,";
  const question = input.question.trim();

  return {
    subject: "Time to review a decision",
    ...renderEmailLayout({
      preview: "Your scheduled review is due. Record what actually happened.",
      heading: "Time to revisit this decision.",
      bodyHtml: `<p style="margin:0 0 12px;">${escapeHtml(greeting)}</p>
        <p style="margin:0 0 12px;">The review date you set has arrived. Open the review and record the outcome against your original prediction.</p>
        <p style="margin:0;">${escapeHtml(question)}</p>`,
      bodyText: `${greeting}\n\nThe review date you set has arrived. Open the review and record the outcome against your original prediction.\n\n${question}`,
      cta: { label: "Start review", url: input.url },
      footer: "You received this because you scheduled a review on Veylora.",
    }),
  };
}

export function weeklyDigestEmail(input: {
  name?: string | null;
  dueCount: number;
  upcoming: { question: string; reviewDate: string }[];
  url: string;
}): EmailContent {
  const greeting = input.name?.trim() ? `Hi ${input.name.trim()},` : "Hi,";
  const dueLine =
    input.dueCount === 0
      ? "No reviews are due right now."
      : input.dueCount === 1
        ? "1 review is due now."
        : `${input.dueCount} reviews are due now.`;

  const upcomingHtml =
    input.upcoming.length === 0
      ? `<p style="margin:0;">No upcoming reviews this week.</p>`
      : `<p style="margin:0 0 12px;">Coming up:</p>
        <ul style="margin:0;padding-left:20px;">
          ${input.upcoming
            .map(
              (item) =>
                `<li style="margin:0 0 8px;">${escapeHtml(item.question)} — ${escapeHtml(item.reviewDate)}</li>`,
            )
            .join("")}
        </ul>`;

  const upcomingText =
    input.upcoming.length === 0
      ? "No upcoming reviews this week."
      : `Coming up:\n${input.upcoming
          .map((item) => `- ${item.question} — ${item.reviewDate}`)
          .join("\n")}`;

  return {
    subject: "Your weekly reflection digest",
    ...renderEmailLayout({
      preview: "A quiet look at upcoming reviews and anything due.",
      heading: "A quiet look at the week.",
      bodyHtml: `<p style="margin:0 0 12px;">${escapeHtml(greeting)}</p>
        <p style="margin:0 0 12px;">${escapeHtml(dueLine)}</p>
        ${upcomingHtml}`,
      bodyText: `${greeting}\n\n${dueLine}\n\n${upcomingText}`,
      cta: { label: "Open reviews", url: input.url },
      footer:
        "You received this because weekly reflection digest is on in Settings.",
    }),
  };
}
