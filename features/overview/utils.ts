import { ACCURACY_PERCENTAGES } from "@/features/insights/consts";
import { PredictionAccuracy } from "@/shared/generated/prisma/enums";
import {
  differenceInCalendarDays,
  differenceInHours,
  format,
  subMonths,
} from "date-fns";
import { ACCURACY_TREND_MONTHS } from "./consts";
import type { AccuracyTrendPoint } from "./types";

function mean(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function roundedMean(values: number[]) {
  return Math.round(mean(values));
}

export function accuracyPercent(accuracy: PredictionAccuracy | null) {
  if (!accuracy) return 0;
  return ACCURACY_PERCENTAGES[accuracy];
}

export function calculateAccuracyScore(
  accuracies: Array<PredictionAccuracy | null>,
) {
  const values = accuracies
    .filter((accuracy): accuracy is PredictionAccuracy => accuracy !== null)
    .map(accuracyPercent);

  if (values.length === 0) return null;
  return roundedMean(values);
}

export function calculateAccuracyTrend(
  reviews: Array<{
    reviewedAt: Date;
    accuracy: PredictionAccuracy | null;
  }>,
  now = new Date(),
): AccuracyTrendPoint[] {
  const byMonth = new Map<string, number[]>();

  for (const review of reviews) {
    if (!review.accuracy) continue;
    const key = format(review.reviewedAt, "yyyy-MM");
    const bucket = byMonth.get(key) ?? [];
    bucket.push(accuracyPercent(review.accuracy));
    byMonth.set(key, bucket);
  }

  return Array.from({ length: ACCURACY_TREND_MONTHS }, (_, index) => {
    const date = subMonths(now, ACCURACY_TREND_MONTHS - 1 - index);
    const key = format(date, "yyyy-MM");
    const values = byMonth.get(key);

    return {
      month: format(date, "MMM").toUpperCase(),
      accuracy: values && values.length > 0 ? roundedMean(values) : null,
    };
  });
}

export function formatCreatedLabel(date: Date) {
  return `Created ${format(date, "MMM d")}`;
}

export function formatReviewInLabel(reviewDate: Date, now = new Date()) {
  const days = differenceInCalendarDays(reviewDate, now);

  if (days < 0) {
    const overdue = Math.abs(days);
    return overdue === 1 ? "Due yesterday" : `Overdue ${overdue} days`;
  }

  if (days === 0) return "Due today";
  if (days === 1) return "Review in 1 day";
  return `Review in ${days} days`;
}

export function formatReviewDateLabel(date: Date) {
  return format(date, "MMM d, yyyy").toUpperCase();
}

export function formatRelativeDate(date: Date, now = new Date()) {
  const days = differenceInCalendarDays(now, date);

  if (days === 0) {
    const hours = differenceInHours(now, date);
    if (hours <= 0) return "Just now";
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }

  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return format(date, "MMM d");
}
