import { ACCURACY_PERCENTAGES } from "./consts";
import { DecisionsWithReviews } from "./types";

export function calculatePredictionAccuracy(decisions: DecisionsWithReviews[]) {
  const totalAccuracy = decisions.reduce((acc: number, decision) => {
    return acc + (ACCURACY_PERCENTAGES[decision.review.accuracy!] ?? 0);
  }, 0);

  return Math.round(totalAccuracy / decisions.length);
}
