import { addDays, subDays } from "date-fns";
import type { CompletedReview, PendingReview } from "./types";

const today = new Date();

export const MOCK_PENDING_REVIEWS: PendingReview[] = [
  {
    id: "rev-due-1",
    question: "Should I switch to the Lead Product role?",
    category: "CAREER",
    lockedAt: subDays(today, 21),
    reviewDate: today,
    confidence: 75,
    urgency: "due",
    predictions:
      "I expect that taking this role will increase my long-term career satisfaction by at least 20% despite the initial stress. I predict I will have adjusted to the new team within three months.",
  },
  {
    id: "rev-upcoming-1",
    question: "Moving back to the city center?",
    category: "PERSONAL",
    lockedAt: subDays(today, 10),
    reviewDate: addDays(today, 3),
    confidence: 60,
    urgency: "upcoming",
    predictions:
      "I expect the move will reduce my commute stress and give me more evening energy, though rent will be meaningfully higher.",
  },
];

export const MOCK_COMPLETED_REVIEWS: CompletedReview[] = [
  {
    id: "rev-done-1",
    question: "Should I invest time in learning Rust?",
    category: "CAREER",
    reviewedAt: subDays(today, 8),
    accuracy: "MOSTLY_ACCURATE",
  },
];

export function getMockPendingReview(id: string) {
  return MOCK_PENDING_REVIEWS.find((review) => review.id === id);
}
