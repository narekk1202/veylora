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
    lockedAt: subDays(today, 90),
    reviewedAt: subDays(today, 8),
    confidence: 65,
    predictions:
      "I expect Rust will feel slow for the first month, then unlock clearer systems thinking that transfers to TypeScript work within a quarter.",
    accuracy: "MOSTLY_ACCURATE",
    actualOutcome:
      "The first six weeks were slower than expected, but by month three I was shipping small CLI tools and noticing better ownership of memory and concurrency tradeoffs in reviews.",
    surprise:
      "Community docs and compiler errors taught me faster than courses. The surprise was how often Rust made me simplify designs rather than just write safer code.",
    learned:
      "Steep tooling curves are tolerable when feedback loops are immediate. I underestimate early friction and overestimate how long that friction lasts.",
    differently:
      "I would set a smaller first milestone (one shipped tool in 30 days) and schedule a mid-point check instead of waiting for the full review window.",
  },
];

export function getMockPendingReview(id: string) {
  return MOCK_PENDING_REVIEWS.find((review) => review.id === id);
}

export function getMockCompletedReview(id: string) {
  return MOCK_COMPLETED_REVIEWS.find((review) => review.id === id);
}

export function getMockReview(id: string) {
  const pending = getMockPendingReview(id);
  if (pending) {
    return { status: "pending" as const, review: pending };
  }

  const completed = getMockCompletedReview(id);
  if (completed) {
    return { status: "completed" as const, review: completed };
  }

  return null;
}
