import PreviousPageButton from "@/shared/components/previous-page-button";
import { ReviewStatus } from "@/shared/generated/prisma/enums";
import { notFound } from "next/navigation";
import { getReview } from "../../queries";
import CompletedReviewDetails from "./completed-review-details";
import DueReviewForm from "./pending-review-form";

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

      {review.status === ReviewStatus.DUE ? (
        <DueReviewForm review={review} />
      ) : (
        <CompletedReviewDetails review={review} />
      )}
    </main>
  );
};

export default ReviewView;
