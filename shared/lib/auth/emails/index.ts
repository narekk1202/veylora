import type { BetterAuthEmailHelpers } from "supersendtx-better-auth";
import { resetPasswordEmail, verificationEmail } from "./templates";

function dispatch(
  send: BetterAuthEmailHelpers["sendAuthEmail"],
  params: Parameters<BetterAuthEmailHelpers["sendAuthEmail"]>[0],
) {
  void send(params).catch((error) => {
    console.error("[auth-email] failed to send", params.tag, error);
  });
}

export function createTemplatedAuthEmail(tx: BetterAuthEmailHelpers) {
  return {
    sendVerificationEmail: async (
      ctx: Parameters<BetterAuthEmailHelpers["sendVerificationEmail"]>[0],
    ) => {
      const to = ctx.user.email?.trim();
      if (!to) throw new Error("Better Auth user is missing an email address");
      const content = verificationEmail({ name: ctx.user.name, url: ctx.url });
      dispatch(tx.sendAuthEmail, { to, ...content, tag: "verify" });
    },

    sendResetPassword: async (
      ctx: Parameters<BetterAuthEmailHelpers["sendResetPassword"]>[0],
    ) => {
      const to = ctx.user.email?.trim();
      if (!to) throw new Error("Better Auth user is missing an email address");
      const content = resetPasswordEmail({ name: ctx.user.name, url: ctx.url });
      dispatch(tx.sendAuthEmail, { to, ...content, tag: "reset" });
    },
  };
}

export { resetPasswordEmail, verificationEmail };
