-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CAREER', 'PERSONAL', 'FINANCE', 'RELATIONSHIPS');

-- CreateEnum
CREATE TYPE "DecisionStatus" AS ENUM ('LOCKED', 'REVIEWED');

-- CreateEnum
CREATE TYPE "PredictionAccuracy" AS ENUM ('ACCURATE', 'MOSTLY_ACCURATE', 'INACCURATE');

-- CreateTable
CREATE TABLE "decision" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'CAREER',
    "question" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "primaryReasons" TEXT NOT NULL,
    "potentialConcerns" TEXT NOT NULL,
    "assumptions" TEXT NOT NULL,
    "predictions" TEXT NOT NULL,
    "confidence" INTEGER NOT NULL,
    "reviewDate" DATE NOT NULL,
    "status" "DecisionStatus" NOT NULL DEFAULT 'LOCKED',
    "actualOutcome" TEXT,
    "accuracy" "PredictionAccuracy",
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "decision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "decision_option" (
    "id" TEXT NOT NULL,
    "decisionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isSelected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "decision_option_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "decision_userId_idx" ON "decision"("userId");

-- CreateIndex
CREATE INDEX "decision_userId_status_idx" ON "decision"("userId", "status");

-- CreateIndex
CREATE INDEX "decision_userId_createdAt_idx" ON "decision"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "decision_status_reviewDate_idx" ON "decision"("status", "reviewDate");

-- CreateIndex
CREATE INDEX "decision_option_decisionId_idx" ON "decision_option"("decisionId");

-- AddForeignKey
ALTER TABLE "decision" ADD CONSTRAINT "decision_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decision_option" ADD CONSTRAINT "decision_option_decisionId_fkey" FOREIGN KEY ("decisionId") REFERENCES "decision"("id") ON DELETE CASCADE ON UPDATE CASCADE;
