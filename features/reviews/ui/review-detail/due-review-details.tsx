import { ReviewWithDecision } from "../../types";
import DueReviewSection from "./due-review-section";
import OriginalDecisionSummary from "./original-decision-summary";
import ReviewHeader from "./review-header";

const DueReviewDetails = ({ review }: { review: ReviewWithDecision }) => {
  return (
    <>
      <ReviewHeader status={review.status} />
      <OriginalDecisionSummary review={review} />
      <DueReviewSection review={review} />
    </>
  );
};

export default DueReviewDetails;
