import { reviewDueEmail } from "@/features/reviews/emails";
import { ReviewStatus } from "@/shared/generated/prisma/enums";
import { env } from "@/shared/config/env";
import { sendAppEmail } from "@/shared/lib/email";
import { prisma } from "@/shared/lib/prisma";
import { startOfDay } from "date-fns";

export async function sendDueReviewEmails(now = new Date()) {
  const today = startOfDay(now);

  const due = await prisma.review.findMany({
    where: {
      status: { not: ReviewStatus.COMPLETED },
      dueNotifiedAt: null,
      decision: { reviewDate: { lte: today } },
    },
    include: {
      user: { select: { email: true, name: true } },
      decision: { select: { question: true } },
    },
  });

  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const review of due) {
    const to = review.user.email.trim();
    if (!to) {
      skipped += 1;
      continue;
    }

    try {
      const content = reviewDueEmail({
        name: review.user.name,
        question: review.decision.question,
        url: `${env.BETTER_AUTH_URL}/reviews/${review.id}`,
      });

      await sendAppEmail({ to, ...content, tag: "review-due" });

      await prisma.review.update({
        where: { id: review.id },
        data: { dueNotifiedAt: new Date() },
      });

      sent += 1;
    } catch (error) {
      console.error("[review-due-email] failed", review.id, error);
      failed += 1;
    }
  }

  return { scanned: due.length, sent, failed, skipped };
}
