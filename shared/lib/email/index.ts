import { env } from "@/shared/config/env";
import { SuperSendTX } from "supersendtx";

export const tx = new SuperSendTX(env.SUPERSENDTX_API_KEY);

export async function sendAppEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
  tag?: string;
}) {
  return tx.emails.send({
    from: env.FROM_EMAIL,
    ...params,
  });
}
