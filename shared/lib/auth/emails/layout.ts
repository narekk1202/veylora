export type AuthEmailContent = {
  subject: string;
  html: string;
  text: string;
};

export type AuthEmailLayoutInput = {
  preview: string;
  heading: string;
  bodyHtml: string;
  bodyText: string;
  cta?: { label: string; url: string };
  footer: string;
};

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderAuthEmailLayout({
  preview,
  heading,
  bodyHtml,
  bodyText,
  cta,
  footer,
}: AuthEmailLayoutInput): Pick<AuthEmailContent, "html" | "text"> {
  const ctaHtml = cta
    ? `<tr>
        <td style="padding:28px 0 8px;">
          <a href="${escapeHtml(cta.url)}" style="display:inline-block;background:#b4a8c9;color:#16141c;font-family:Inter,Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:0.02em;text-decoration:none;padding:12px 22px;border-radius:8px;">
            ${escapeHtml(cta.label)}
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0 0;font-family:Inter,Arial,sans-serif;font-size:12px;line-height:18px;color:#8b8b96;word-break:break-all;">
          Or paste this URL:<br />
          <a href="${escapeHtml(cta.url)}" style="color:#b4a8c9;text-decoration:underline;">${escapeHtml(cta.url)}</a>
        </td>
      </tr>`
    : "";

  const ctaText = cta ? `\n\n${cta.label}: ${cta.url}` : "";

  return {
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:0;background:#121218;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#121218;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
            <tr>
              <td align="center" style="padding:8px 0 24px;font-family:Inter,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;color:#b4a8c9;">
                veylora
              </td>
            </tr>
            <tr>
              <td style="background:#1c1c26;border:1px solid #2a2a36;border-radius:10px;padding:32px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:32px;color:#f5f5f7;">
                      ${escapeHtml(heading)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:16px;font-family:Inter,Arial,sans-serif;font-size:15px;line-height:24px;color:#c4c4ce;">
                      ${bodyHtml}
                    </td>
                  </tr>
                  ${ctaHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:20px 8px 0;font-family:Inter,Arial,sans-serif;font-size:12px;line-height:18px;color:#6f6f7a;">
                ${escapeHtml(footer)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    text: `${heading}\n\n${bodyText}${ctaText}\n\n${footer}`,
  };
}
