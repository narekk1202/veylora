"use client";

import PreviousPageButton from "@/shared/components/previous-page-button";
import { Textarea } from "@/shared/components/ui/textarea";
import { notFound } from "next/navigation";
import { useState } from "react";
import { getMockReview } from "../../mock-data";
import type {
  CompletedReview,
  PendingReview,
  ReviewAccuracyChoice,
  ReviewFormState,
} from "../../types";
import { toReviewAccuracyChoice } from "../../utils";
import AccuracyPicker from "./accuracy-picker";
import OriginalDecisionSummary from "./original-decision-summary";
import ReviewAnswer from "./review-answer";
import ReviewFooter from "./review-footer";
import ReviewFormSection from "./review-form-section";
import ReviewHeader from "./review-header";

const INITIAL_FORM: ReviewFormState = {
  actualOutcome: "",
  accuracy: null,
  surprise: "",
  learned: "",
  differently: "",
};

type ReviewViewProps = {
  id: string;
};

const PendingReviewForm = ({ review }: { review: PendingReview }) => {
  const [form, setForm] = useState<ReviewFormState>(INITIAL_FORM);

  const setField =
    <K extends keyof ReviewFormState>(field: K) =>
    (value: ReviewFormState[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  return (
    <>
      <ReviewHeader status="pending" />
      <OriginalDecisionSummary review={review} />

      <div className="flex flex-col gap-10">
        <ReviewFormSection step={1} title="What actually happened?">
          <Textarea
            value={form.actualOutcome}
            onChange={(event) => setField("actualOutcome")(event.target.value)}
            placeholder="Describe the outcome as objectively as possible..."
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What actually happened?"
          />
        </ReviewFormSection>

        <ReviewFormSection step={2} title="How accurate was your prediction?">
          <AccuracyPicker
            value={form.accuracy}
            onChange={(value: ReviewAccuracyChoice) =>
              setField("accuracy")(value)
            }
          />
        </ReviewFormSection>

        <ReviewFormSection step={3} title="What surprised you?">
          <Textarea
            value={form.surprise}
            onChange={(event) => setField("surprise")(event.target.value)}
            placeholder="Details you didn't anticipate, both positive and negative..."
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What surprised you?"
          />
        </ReviewFormSection>

        <ReviewFormSection step={4} title="What did you learn?">
          <Textarea
            value={form.learned}
            onChange={(event) => setField("learned")(event.target.value)}
            placeholder="Knowledge gained about the world, others, or yourself..."
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What did you learn?"
          />
        </ReviewFormSection>

        <ReviewFormSection step={5} title="What would you do differently?">
          <Textarea
            value={form.differently}
            onChange={(event) => setField("differently")(event.target.value)}
            placeholder="If you were in the same situation again, how would your process change?"
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What would you do differently?"
          />
        </ReviewFormSection>
      </div>

      <ReviewFooter status="pending" />
    </>
  );
};

const CompletedReviewDetail = ({ review }: { review: CompletedReview }) => {
  return (
    <>
      <ReviewHeader status="completed" />
      <OriginalDecisionSummary review={review} />

      <div className="flex flex-col gap-10">
        <ReviewFormSection step={1} title="What actually happened?">
          <ReviewAnswer label="What actually happened?">
            {review.actualOutcome}
          </ReviewAnswer>
        </ReviewFormSection>

        <ReviewFormSection step={2} title="How accurate was your prediction?">
          <AccuracyPicker
            value={toReviewAccuracyChoice(review.accuracy)}
            readOnly
          />
        </ReviewFormSection>

        <ReviewFormSection step={3} title="What surprised you?">
          <ReviewAnswer label="What surprised you?">
            {review.surprise}
          </ReviewAnswer>
        </ReviewFormSection>

        <ReviewFormSection step={4} title="What did you learn?">
          <ReviewAnswer label="What did you learn?">
            {review.learned}
          </ReviewAnswer>
        </ReviewFormSection>

        <ReviewFormSection step={5} title="What would you do differently?">
          <ReviewAnswer label="What would you do differently?">
            {review.differently}
          </ReviewAnswer>
        </ReviewFormSection>
      </div>

      <ReviewFooter status="completed" reviewedAt={review.reviewedAt} />
    </>
  );
};

const ReviewView = ({ id }: ReviewViewProps) => {
  const result = getMockReview(id);

  if (!result) notFound();

  return (
    <main className="page_view">
      <div>
        <PreviousPageButton />
      </div>

      {result.status === "pending" ? (
        <PendingReviewForm review={result.review} />
      ) : (
        <CompletedReviewDetail review={result.review} />
      )}
    </main>
  );
};

export default ReviewView;
