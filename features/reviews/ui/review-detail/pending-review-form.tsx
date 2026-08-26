import { Textarea } from "@/shared/components/ui/textarea";
import { ReviewWithDecision } from "../../types";
import AccuracyPicker from "./accuracy-picker";
import OriginalDecisionSummary from "./original-decision-summary";
import ReviewFooter from "./review-footer";
import ReviewFormSection from "./review-form-section";
import ReviewHeader from "./review-header";

const DueReviewForm = ({ review }: { review: ReviewWithDecision }) => {
  return (
    <>
      <ReviewHeader status={review.status} />
      <OriginalDecisionSummary review={review} />

      <div className="flex flex-col gap-10">
        <ReviewFormSection step={1} title="What actually happened?">
          <Textarea
            placeholder="Describe the outcome as objectively as possible..."
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What actually happened?"
          />
        </ReviewFormSection>

        <ReviewFormSection step={2} title="How accurate was your prediction?">
          <AccuracyPicker value={review.accuracy || "INACCURATE"} />
        </ReviewFormSection>

        <ReviewFormSection step={3} title="What surprised you?">
          <Textarea
            placeholder="Details you didn't anticipate, both positive and negative..."
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What surprised you?"
          />
        </ReviewFormSection>

        <ReviewFormSection step={4} title="What did you learn?">
          <Textarea
            placeholder="Knowledge gained about the world, others, or yourself..."
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What did you learn?"
          />
        </ReviewFormSection>

        <ReviewFormSection step={5} title="What would you do differently?">
          <Textarea
            placeholder="If you were in the same situation again, how would your process change?"
            className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 ring-1"
            aria-label="What would you do differently?"
          />
        </ReviewFormSection>
      </div>

      <ReviewFooter status={review.status} />
    </>
  );
};

export default DueReviewForm;
