import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import { Category, PredictionAccuracy } from "@/shared/generated/prisma/enums";
import { differenceInCalendarDays, format } from "date-fns";
import {
  ACCURACY_PERCENTAGES,
  CALIBRATION_GAP_THRESHOLD,
  CONFIDENCE_BINS,
  POSITIVE_ACCURACIES,
} from "./consts";
import type {
  CalibrationInsight,
  CalibrationPoint,
  CategoryInsight,
  DecisionWithReview,
  InsightsData,
  TimelineCalibration,
  TimelineEstimateInsight,
  TimelineStatus,
  TrendObservation,
} from "./types";

function mean(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function roundedMean(values: number[]) {
  return Math.round(mean(values));
}

function maxBy<T>(items: T[], score: (item: T) => number) {
  return items.reduce((best, item) =>
    score(item) > score(best) ? item : best,
  );
}

function minBy<T>(items: T[], score: (item: T) => number) {
  return items.reduce((best, item) =>
    score(item) < score(best) ? item : best,
  );
}

function accuracyPercent(accuracy: PredictionAccuracy | null) {
  if (!accuracy) return 0;
  return ACCURACY_PERCENTAGES[accuracy];
}

function isPositiveAccuracy(accuracy: PredictionAccuracy | null) {
  return accuracy !== null && POSITIVE_ACCURACIES.includes(accuracy);
}

function reviewedAtOf(decision: DecisionWithReview) {
  return decision.reviewedAt ?? decision.review.updatedAt;
}

function dayLabel(days: number) {
  return days === 1 ? "Day" : "Days";
}

function confidenceBin(confidence: number) {
  if (confidence <= 0) return 0;
  return Math.min(100, Math.ceil(confidence / 20) * 20);
}

export function calculatePredictionAccuracy(decisions: DecisionWithReview[]) {
  if (decisions.length === 0) return 0;
  return roundedMean(
    decisions.map((decision) => accuracyPercent(decision.review.accuracy)),
  );
}

export function calculateConfidenceScore(decisions: DecisionWithReview[]) {
  if (decisions.length === 0) return 0;
  return roundedMean(decisions.map((decision) => decision.confidence));
}

export function calculateTrendObservation(
  decisions: DecisionWithReview[],
): TrendObservation {
  const byMonth = new Map<
    string,
    { date: Date; confidences: number[]; accuracies: number[] }
  >();

  for (const decision of decisions) {
    const reviewedAt = reviewedAtOf(decision);
    const key = format(reviewedAt, "yyyy-MM");
    const bucket = byMonth.get(key) ?? {
      date: reviewedAt,
      confidences: [],
      accuracies: [],
    };
    bucket.confidences.push(decision.confidence);
    bucket.accuracies.push(accuracyPercent(decision.review.accuracy));
    byMonth.set(key, bucket);
  }

  const months = [...byMonth.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, bucket]) => bucket);

  const spanYears = new Set(months.map((month) => month.date.getFullYear()));
  const points = months.map((month) => ({
    month:
      spanYears.size > 1
        ? format(month.date, "MMM yyyy")
        : format(month.date, "MMM"),
    confidence: roundedMean(month.confidences),
    accuracy: roundedMean(month.accuracies),
  }));

  if (points.length < 2) {
    return {
      points: points.map(({ month, confidence }) => ({ month, confidence })),
      lead: "Keep reviewing to see how your confidence and accuracy move over time.",
      highlight: "",
      follow: "",
    };
  }

  const first = points[0];
  const last = points[points.length - 1];
  const confidenceDelta = last.confidence - first.confidence;
  const accuracyDelta = last.accuracy - first.accuracy;
  const monthSpan = points.length;
  const absDelta = Math.abs(confidenceDelta);

  const direction =
    confidenceDelta > 1
      ? "increased"
      : confidenceDelta < -1
        ? "decreased"
        : "held steady";

  const accuracyFollow =
    Math.abs(accuracyDelta) <= 1
      ? "while accuracy has stayed about the same."
      : (confidenceDelta > 1 && accuracyDelta > 1) ||
          (confidenceDelta < -1 && accuracyDelta < -1)
        ? `matching a slight ${accuracyDelta > 0 ? "upward" : "downward"} trend in accuracy.`
        : `while accuracy has moved the other way.`;

  if (direction === "held steady") {
    return {
      points: points.map(({ month, confidence }) => ({ month, confidence })),
      lead: "Your prediction confidence has held steady ",
      highlight: `over the last ${monthSpan} months`,
      follow: `, ${accuracyFollow}`,
    };
  }

  return {
    points: points.map(({ month, confidence }) => ({ month, confidence })),
    lead: `Your prediction confidence has ${direction} by `,
    highlight: `${absDelta}% over the last ${monthSpan} months`,
    follow: `, ${accuracyFollow}`,
  };
}

export function calculateCalibration(
  decisions: DecisionWithReview[],
): CalibrationInsight {
  const totals = new Map<number, { accuracy: number; count: number }>();

  for (const decision of decisions) {
    const bin = confidenceBin(decision.confidence);
    const current = totals.get(bin) ?? { accuracy: 0, count: 0 };
    current.accuracy += accuracyPercent(decision.review.accuracy);
    current.count += 1;
    totals.set(bin, current);
  }

  const points: CalibrationPoint[] = CONFIDENCE_BINS.map((bin) => {
    if (bin === 0) {
      return { confidence: 0, actual: 0, ideal: 0 };
    }

    const bucket = totals.get(bin);
    return {
      confidence: bin,
      actual:
        bucket && bucket.count > 0
          ? Math.round(bucket.accuracy / bucket.count)
          : null,
      ideal: bin,
    };
  });

  const predictionAccuracy = calculatePredictionAccuracy(decisions);
  const confidenceScore = calculateConfidenceScore(decisions);
  const gap = predictionAccuracy - confidenceScore;

  if (Math.abs(gap) < CALIBRATION_GAP_THRESHOLD) {
    return {
      points,
      patternTitle: "Well calibrated:",
      patternDescription:
        "Your stated confidence is closely aligned with your actual accuracy.",
    };
  }

  if (gap > 0) {
    return {
      points,
      patternTitle: "Under-confidence pattern:",
      patternDescription: `Your actual accuracy is ${gap}% higher than your stated confidence suggests.`,
    };
  }

  return {
    points,
    patternTitle: "Over-confidence pattern:",
    patternDescription: `Your stated confidence is ${Math.abs(gap)}% higher than your actual accuracy.`,
  };
}

function groupByCategory(decisions: DecisionWithReview[]) {
  const groups = new Map<Category, DecisionWithReview[]>();

  for (const decision of decisions) {
    const items = groups.get(decision.category) ?? [];
    items.push(decision);
    groups.set(decision.category, items);
  }

  return [...groups.entries()].map(([category, items]) => ({
    category,
    avgConfidence: roundedMean(items.map((item) => item.confidence)),
    avgAccuracy: roundedMean(
      items.map((item) => accuracyPercent(item.review.accuracy)),
    ),
    reasoningLength: mean(items.map((item) => item.primaryReasons.length)),
    notesRate:
      items.filter((item) => item.postHocNotes?.trim()).length / items.length,
  }));
}

export function calculateCategoryInsights(
  decisions: DecisionWithReview[],
): CategoryInsight[] {
  const groups = groupByCategory(decisions);
  if (groups.length === 0) return [];

  const insights: CategoryInsight[] = [];
  const used = new Set<Category>();
  const overallConfidence = calculateConfidenceScore(decisions);

  const highestConfidence = maxBy(groups, (group) => group.avgConfidence);
  const longestReasoning = maxBy(groups, (group) => group.reasoningLength);
  const highestName = CATEGORY_CONFIG[highestConfidence.category].name;

  insights.push({
    category: highestConfidence.category,
    title: `${highestName} Clarity`,
    description:
      `You tend to be most confident about ${highestName.toLowerCase()} decisions (Avg. ${highestConfidence.avgConfidence}%).` +
      (longestReasoning.category === highestConfidence.category
        ? " These also show the most detailed pre-decision reasoning."
        : ""),
  });
  used.add(highestConfidence.category);

  if (groups.length >= 2) {
    const lowestConfidence = minBy(groups, (group) => group.avgConfidence);
    if (!used.has(lowestConfidence.category)) {
      const gap = Math.max(
        0,
        overallConfidence - lowestConfidence.avgConfidence,
      );
      const lowestName = CATEGORY_CONFIG[lowestConfidence.category].name;
      insights.push({
        category: lowestConfidence.category,
        title: `${lowestName} Hesitation`,
        description:
          (lowestConfidence.notesRate > 0
            ? `${lowestName} decisions are often revisited after locking. `
            : "") +
          `You tend to be ${gap}% less confident here than in other categories.`,
      });
      used.add(lowestConfidence.category);
    }
  }

  const positive = decisions.filter((decision) =>
    isPositiveAccuracy(decision.review.accuracy),
  );

  if (positive.length > 0 && groups.length >= 2) {
    const share = maxBy(groups, (group) => {
      const count = positive.filter(
        (decision) => decision.category === group.category,
      ).length;
      return count / positive.length;
    });

    if (!used.has(share.category)) {
      const pct = Math.round(
        (positive.filter((decision) => decision.category === share.category)
          .length /
          positive.length) *
          100,
      );
      if (pct > 0) {
        const shareName = CATEGORY_CONFIG[share.category].name;
        insights.push({
          category: share.category,
          title: `${shareName} Accuracy`,
          description: `${pct}% of your more accurate predictions fall under the ${shareName} category.`,
        });
        used.add(share.category);
      }
    }
  }

  if (insights.length < 3) {
    const leftover = groups
      .filter((group) => !used.has(group.category))
      .sort((a, b) => b.avgAccuracy - a.avgAccuracy);

    for (const group of leftover) {
      if (insights.length >= 3) break;
      const name = CATEGORY_CONFIG[group.category].name;
      insights.push({
        category: group.category,
        title: `${name} Accuracy`,
        description: `Average prediction accuracy in ${name.toLowerCase()} is ${group.avgAccuracy}%.`,
      });
      used.add(group.category);
    }
  }

  if (insights.length === 1 && groups.length === 1) {
    const only = groups[0];
    const name = CATEGORY_CONFIG[only.category].name;
    insights.push({
      category: only.category,
      title: `${name} Accuracy`,
      description: `Average prediction accuracy in ${name.toLowerCase()} is ${only.avgAccuracy}%.`,
    });
  }

  return insights.slice(0, 3);
}

function timelineStatus(delta: number): TimelineStatus {
  if (delta > 0) return "late";
  if (delta < 0) return "early";
  return "on_time";
}

function timelineStatusLabel(delta: number) {
  if (delta === 0) return "On Time";
  if (delta > 0) return `+${delta} ${dayLabel(delta)}`;
  const earlyBy = Math.abs(delta);
  return `−${earlyBy} ${dayLabel(earlyBy)}`;
}

export function calculateTimelineCalibration(
  decisions: DecisionWithReview[],
): TimelineCalibration {
  const items = decisions.map((decision) => {
    const reviewedAt = reviewedAtOf(decision);
    const expectedDays = Math.max(
      1,
      differenceInCalendarDays(decision.reviewDate, decision.createdAt),
    );
    const actualDays = Math.max(
      0,
      differenceInCalendarDays(reviewedAt, decision.createdAt),
    );
    const delta = actualDays - expectedDays;

    return {
      title: decision.question,
      status: timelineStatus(delta),
      statusLabel: timelineStatusLabel(delta),
      expectedDays,
      actualDays,
      delta,
      reviewedAt,
      progress: Math.round(
        Math.min(100, (expectedDays / Math.max(actualDays, 1)) * 100),
      ),
    };
  });

  if (items.length === 0) {
    return {
      estimates: [],
      biasTitle: "Timeline",
      lead: "Complete reviews to see how your planned dates compare with when you actually look back.",
      highlight: "",
      follow: "",
    };
  }

  const estimates: TimelineEstimateInsight[] = [...items]
    .sort((a, b) => {
      const deltaDiff = Math.abs(b.delta) - Math.abs(a.delta);
      if (deltaDiff !== 0) return deltaDiff;
      return b.reviewedAt.getTime() - a.reviewedAt.getTime();
    })
    .slice(0, 2)
    .map((item) => ({
      title: item.title,
      status: item.status,
      statusLabel: item.statusLabel,
      expectedDays: item.expectedDays,
      actualDays: item.actualDays,
      progress: item.progress,
    }));

  const ratios = items
    .filter((item) => item.expectedDays > 0)
    .map((item) => item.actualDays / item.expectedDays);
  const percentLonger = Math.round((mean(ratios) - 1) * 100);

  if (percentLonger > CALIBRATION_GAP_THRESHOLD) {
    return {
      estimates,
      biasTitle: "Optimism Bias",
      lead: "On average, review timelines are ",
      highlight: `${percentLonger}% longer`,
      follow:
        " than initially planned. Consider adding a buffer to future reasoning.",
    };
  }

  if (percentLonger < -CALIBRATION_GAP_THRESHOLD) {
    return {
      estimates,
      biasTitle: "Pessimism Bias",
      lead: "On average, you review ",
      highlight: `${Math.abs(percentLonger)}% sooner`,
      follow:
        " than planned. Your future self is arriving earlier than expected.",
    };
  }

  return {
    estimates,
    biasTitle: "On Track",
    lead: "Your review timelines tend to match what you planned. Keep using that same buffer in future reasoning.",
    highlight: "",
    follow: "",
  };
}

export function buildInsights(decisions: DecisionWithReview[]): InsightsData {
  return {
    predictionAccuracy: calculatePredictionAccuracy(decisions),
    confidenceScore: calculateConfidenceScore(decisions),
    trend: calculateTrendObservation(decisions),
    calibration: calculateCalibration(decisions),
    categories: calculateCategoryInsights(decisions),
    timeline: calculateTimelineCalibration(decisions),
  };
}
