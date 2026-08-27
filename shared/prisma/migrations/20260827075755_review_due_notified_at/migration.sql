-- AlterTable
ALTER TABLE "review" ADD COLUMN     "dueNotifiedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "review_status_dueNotifiedAt_idx" ON "review"("status", "dueNotifiedAt");
