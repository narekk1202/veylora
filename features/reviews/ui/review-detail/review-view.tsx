import PreviousPageButton from "@/shared/components/previous-page-button";
import { notFound } from "next/navigation";
import { getReview } from "../../queries";
import { isReviewOpenForCompletion } from "../../utils";
import CompletedReviewDetails from "./completed-review-details";
import DueReviewForm from "./due-review-form";

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
        <DueReviewForm review={review} />
      ) : (
        <CompletedReviewDetails review={review} />
      )}
    </main>
  );
};

export default ReviewView;
