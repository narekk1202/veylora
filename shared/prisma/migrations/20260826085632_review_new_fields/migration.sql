-- AlterTable
ALTER TABLE "review" ADD COLUMN     "lessonsLearned" TEXT,
ADD COLUMN     "outcomeSummary" TEXT,
ADD COLUMN     "surprises" TEXT,
ADD COLUMN     "wouldDoDifferently" TEXT,
ALTER COLUMN "actualOutcome" DROP NOT NULL,
ALTER COLUMN "accuracy" DROP NOT NULL;
