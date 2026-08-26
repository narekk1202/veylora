import {
  differenceInCalendarDays,
  format,
  isToday,
  startOfDay,
} from "date-fns";
import type { PredictionAccuracy } from "@/shared/generated/prisma/enums";
import type { ReviewAccuracyChoice } from "./types";

export function formatReviewUrgencyLabel(reviewDate: Date, now = new Date()) {
  const day = startOfDay(reviewDate);
  const today = startOfDay(now);

  if (day.getTime() < today.getTime()) {
    const overdueDays = differenceInCalendarDays(today, day);
    return overdueDays === 1 ? "DUE YESTERDAY" : `OVERDUE ${overdueDays} DAYS`;
  }

  if (isToday(reviewDate)) {
    return "DUE TODAY";
  }

  const daysUntil = differenceInCalendarDays(day, today);
  if (daysUntil === 1) return "IN 1 DAY";
  return `IN ${daysUntil} DAYS`;
}

export function formatAccuracyLabel(accuracy: PredictionAccuracy) {
  switch (accuracy) {
    case "ACCURATE":
      return "accurate";
    case "MOSTLY_ACCURATE":
      return "mostly accurate";
    case "PARTIALLY_ACCURATE":
      return "partially accurate";
    case "MOSTLY_INACCURATE":
      return "mostly inaccurate";
    case "INACCURATE":
      return "inaccurate";
  }
}

export function toReviewAccuracyChoice(
  accuracy: PredictionAccuracy,
): ReviewAccuracyChoice {
  switch (accuracy) {
    case "ACCURATE":
      return "completely_accurate";
    case "MOSTLY_ACCURATE":
      return "mostly_accurate";
    case "PARTIALLY_ACCURATE":
      return "partially_accurate";
    case "MOSTLY_INACCURATE":
    case "INACCURATE":
      return "completely_wrong";
  }
}

export function formatShortDate(date: Date) {
  return format(date, "MMM d");
}

export function formatLongDate(date: Date) {
  return format(date, "MMM d, yyyy");
}
