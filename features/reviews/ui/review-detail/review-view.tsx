import PreviousPageButton from "@/shared/components/previous-page-button";
import { notFound } from "next/navigation";
import { getReview } from "../../queries";
import { isReviewOpenForCompletion } from "../../utils";
import CompletedReviewDetails from "./completed-review-details";
import DueReviewDetails from "./due-review-details";

type ReviewViewProps = {
  id: string;
};

const ReviewView = async ({ id }: ReviewViewProps) => {
  const review = await getReview(id);

  if (!review) notFound();

  return (
    <main className="page_view">
      <div>
        <PreviousPageButton />
      </div>

      {isReviewOpenForCompletion(review.status) ? (
        <DueReviewDetails review={review} />
      ) : (
        <CompletedReviewDetails review={review} />
      )}
    </main>
  );
};

export default ReviewView;
