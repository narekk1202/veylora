import {
  escapeHtml,
  renderAuthEmailLayout,
  type AuthEmailContent,
} from "./layout";

export function verificationEmail(input: {
  name?: string | null;
  url: string;
}): AuthEmailContent {
  const greeting = input.name?.trim() ? `Hi ${input.name.trim()},` : "Hi,";

  return {
    subject: "Verify your email",
    ...renderAuthEmailLayout({
      preview: "Confirm this address to finish creating your Veylora account.",
      heading: "Confirm this address.",
      bodyHtml: `<p style="margin:0 0 12px;">${escapeHtml(greeting)}</p>
        <p style="margin:0;">One click verifies the email on this account. If you did not sign up, ignore this message.</p>`,
      bodyText: `${greeting}\n\nOne click verifies the email on this account. If you did not sign up, ignore this message.`,
      cta: { label: "Verify email", url: input.url },
      footer:
        "This link expires. Veylora never asks for your password by email.",
    }),
  };
}

export function resetPasswordEmail(input: {
  name?: string | null;
  url: string;
}): AuthEmailContent {
  const greeting = input.name?.trim() ? `Hi ${input.name.trim()},` : "Hi,";

  return {
    subject: "Reset your password",
    ...renderAuthEmailLayout({
      preview:
        "Use this link to choose a new password for your Veylora account.",
      heading: "Recover access.",
      bodyHtml: `<p style="margin:0 0 12px;">${escapeHtml(greeting)}</p>
        <p style="margin:0;">Someone requested a password reset for this account. Continue only if that was you.</p>`,
      bodyText: `${greeting}\n\nSomeone requested a password reset for this account. Continue only if that was you.`,
      cta: { label: "Reset password", url: input.url },
      footer:
        "If you did not request this, you can ignore the email. The link expires soon.",
    }),
  };
}
