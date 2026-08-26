/*
  Warnings:

  - You are about to drop the column `accuracy` on the `decision` table. All the data in the column will be lost.
  - You are about to drop the column `actualOutcome` on the `decision` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "decision" DROP COLUMN "accuracy",
DROP COLUMN "actualOutcome";

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "decisionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "actualOutcome" TEXT NOT NULL,
    "accuracy" "PredictionAccuracy" NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "review_decisionId_key" ON "review"("decisionId");

-- CreateIndex
CREATE INDEX "review_userId_idx" ON "review"("userId");

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_decisionId_fkey" FOREIGN KEY ("decisionId") REFERENCES "decision"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
