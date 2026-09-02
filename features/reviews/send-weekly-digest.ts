import { weeklyDigestEmail } from "@/features/reviews/emails";
import { ReviewStatus } from "@/shared/generated/prisma/enums";
import { env } from "@/shared/config/env";
import { sendAppEmail } from "@/shared/lib/email";
import { prisma } from "@/shared/lib/prisma";
import { formatLongDate } from "@/features/reviews/utils";
import { isSunday, startOfDay } from "date-fns";

const UPCOMING_DIGEST_LIMIT = 5;

export async function sendWeeklyDigestEmails(now = new Date()) {
  if (!isSunday(now)) {
    return { scanned: 0, sent: 0, failed: 0, skipped: 0, reason: "not-sunday" };
  }

  const weekStart = startOfDay(now);

  const users = await prisma.user.findMany({
    where: {
      weeklyDigest: true,
      OR: [
        { weeklyDigestSentAt: null },
        { weeklyDigestSentAt: { lt: weekStart } },
      ],
    },
    select: {
      id: true,
      email: true,
      name: true,
      reviews: {
        where: {
          status: { not: ReviewStatus.COMPLETED },
        },
        orderBy: {
          decision: {
            reviewDate: "asc",
          },
        },
        include: {
          decision: {
            select: {
              question: true,
              reviewDate: true,
            },
          },
        },
      },
    },
  });

  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const user of users) {
    const to = user.email.trim();
    if (!to) {
      skipped += 1;
      continue;
    }

    const dueCount = user.reviews.filter(
      (review) => review.decision.reviewDate <= weekStart,
    ).length;
    const upcoming = user.reviews
      .filter((review) => review.decision.reviewDate > weekStart)
      .slice(0, UPCOMING_DIGEST_LIMIT)
      .map((review) => ({
        question: review.decision.question,
        reviewDate: formatLongDate(review.decision.reviewDate),
      }));

    try {
      const content = weeklyDigestEmail({
        name: user.name,
        dueCount,
        upcoming,
        url: `${env.BETTER_AUTH_URL}/reviews`,
      });

      await sendAppEmail({ to, ...content, tag: "weekly-digest" });

      await prisma.user.update({
        where: { id: user.id },
        data: { weeklyDigestSentAt: new Date() },
      });

      sent += 1;
    } catch (error) {
      console.error("[weekly-digest-email] failed", user.id, error);
      failed += 1;
    }
  }

  return { scanned: users.length, sent, failed, skipped };
}
