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
