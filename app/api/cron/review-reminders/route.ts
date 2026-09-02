import { sendDueReviewEmails } from "@/features/reviews/send-due-emails";
import { sendWeeklyDigestEmails } from "@/features/reviews/send-weekly-digest";
import { env } from "@/shared/config/env";
import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorized(request: Request) {
  const header = request.headers.get("authorization");
  if (!header) return false;

  const expected = Buffer.from(`Bearer ${env.CRON_SECRET}`);
  const received = Buffer.from(header);

  if (expected.byteLength !== received.byteLength) return false;
  return timingSafeEqual(expected, received);
}

async function handler(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [due, digest] = await Promise.all([
    sendDueReviewEmails(),
    sendWeeklyDigestEmails(),
  ]);

  return NextResponse.json({ due, digest });
}

export const GET = handler;
export const POST = handler;
