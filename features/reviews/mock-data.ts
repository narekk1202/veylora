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
    confidence: 70,
    urgency: "due",
  },
  {
    id: "rev-upcoming-1",
    question: "Moving back to the city center?",
    category: "PERSONAL",
    lockedAt: subDays(today, 10),
    reviewDate: addDays(today, 3),
    confidence: 60,
    urgency: "upcoming",
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
