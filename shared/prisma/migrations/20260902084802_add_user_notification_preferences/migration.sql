-- AlterTable
ALTER TABLE "user" ADD COLUMN     "emailDueReminders" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "weeklyDigest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weeklyDigestSentAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "user_emailDueReminders_idx" ON "user"("emailDueReminders");

-- CreateIndex
CREATE INDEX "user_weeklyDigest_weeklyDigestSentAt_idx" ON "user"("weeklyDigest", "weeklyDigestSentAt");
