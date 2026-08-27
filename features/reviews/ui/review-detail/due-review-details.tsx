import { ReviewWithDecision } from "../../types";
import DueReviewForm from "./due-review-form";
import OriginalDecisionSummary from "./original-decision-summary";
import ReviewFooter from "./review-footer";
import ReviewHeader from "./review-header";

const DueReviewDetails = ({ review }: { review: ReviewWithDecision }) => {
  return (
    <>
      <ReviewHeader status={review.status} />
      <OriginalDecisionSummary review={review} />
      <DueReviewForm>
        <ReviewFooter status={review.status} />
      </DueReviewForm>
    </>
  );
};

export default DueReviewDetails;
