import type {
  PredictionAccuracy,
  ReviewStatus,
} from "@/shared/generated/prisma/enums";
import {
  differenceInCalendarDays,
  format,
  isToday,
  startOfDay,
} from "date-fns";

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

export function formatShortDate(date: Date) {
  return format(date, "MMM d");
}

export function formatLongDate(date: Date) {
  return format(date, "MMM d, yyyy");
}

export function formatReviewStatus(status: ReviewStatus) {
  switch (status) {
    case "DUE":
      return "Due";
    case "OVERDUE":
      return "Overdue";
    case "COMPLETED":
      return "Completed";
  }
}

export function formatAccuracyLabel(accuracy: PredictionAccuracy) {
  switch (accuracy) {
    case "INACCURATE":
      return "Completely wrong";
    case "MOSTLY_INACCURATE":
      return "Mostly inaccurate";
    case "PARTIALLY_ACCURATE":
      return "Partially accurate";
    case "MOSTLY_ACCURATE":
      return "Mostly accurate";
    case "ACCURATE":
      return "Completely accurate";
  }
}
