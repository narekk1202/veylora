import { differenceInCalendarDays, format, isToday, startOfDay } from "date-fns";
import type { PredictionAccuracy } from "@/shared/generated/prisma/enums";

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
    case "INACCURATE":
      return "inaccurate";
  }
}

export function formatShortDate(date: Date) {
  return format(date, "MMM d");
}
