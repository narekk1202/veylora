import { ReviewWithDecision } from "../../types";
import AccuracyPicker from "./accuracy-picker";
import OriginalDecisionSummary from "./original-decision-summary";
import ReviewAnswer from "./review-answer";
import ReviewFooter from "./review-footer";
import ReviewFormSection from "./review-form-section";
import ReviewHeader from "./review-header";

const CompletedReviewDetails = ({ review }: { review: ReviewWithDecision }) => {
  return (
    <>
      <ReviewHeader status={review.status} />
      <OriginalDecisionSummary review={review} />

      <div className="flex flex-col gap-10">
        <ReviewFormSection step={1} title="What actually happened?">
          <ReviewAnswer label="What actually happened?">
            {review.actualOutcome}
          </ReviewAnswer>
        </ReviewFormSection>

        <ReviewFormSection step={2} title="How accurate was your prediction?">
          <AccuracyPicker value={review.accuracy || "INACCURATE"} readOnly />
        </ReviewFormSection>

        <ReviewFormSection step={3} title="What surprised you?">
          <ReviewAnswer label="What surprised you?">
            {review.surprises}
          </ReviewAnswer>
        </ReviewFormSection>

        <ReviewFormSection step={4} title="What did you learn?">
          <ReviewAnswer label="What did you learn?">
            {review.lessonsLearned}
          </ReviewAnswer>
        </ReviewFormSection>

        <ReviewFormSection step={5} title="What would you do differently?">
          <ReviewAnswer label="What would you do differently?">
            {review.wouldDoDifferently}
          </ReviewAnswer>
        </ReviewFormSection>
      </div>

      <ReviewFooter
        status={review.status}
        reviewedAt={review.decision.reviewedAt || undefined}
      />
    </>
  );
};

export default CompletedReviewDetails;
