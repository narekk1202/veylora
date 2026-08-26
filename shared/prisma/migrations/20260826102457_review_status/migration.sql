-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('DUE', 'OVERDUE', 'COMPLETED', 'UPCOMING');

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "status" "ReviewStatus" NOT NULL DEFAULT 'UPCOMING';
