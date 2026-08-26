import { ReviewStatus } from "@/shared/generated/prisma/enums";
import type { ReviewStatusFilter } from "../schemas";
import { ReviewWithDecision } from "../types";
import CompletedReviewCard from "./completed-review-card";
import EmptyReviews from "./empty-reviews";
import ReviewCard from "./review-card";

const EMPTY_MESSAGES = {
  all: "No reviews yet.",
  due: "No reviews due right now.",
  upcoming: "No upcoming reviews scheduled.",
  completed: "No completed reviews yet.",
};

const ReviewsList = ({
  reviews,
  status,
}: {
  reviews: ReviewWithDecision[];
  status?: ReviewStatusFilter;
}) => {
  const tab = status ?? "all";

  if (tab === "all") {
    const pendingReviews = reviews.filter(
      (review) => review.status !== ReviewStatus.COMPLETED,
    );
    const completedReviews = reviews.filter(
      (review) => review.status === ReviewStatus.COMPLETED,
    );

    if (reviews.length === 0) {
      return <EmptyReviews message={EMPTY_MESSAGES.all} />;
    }

    return (
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          {pendingReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {completedReviews.length > 0 && (
          <>
            <h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Recently completed
            </h2>
            <div className="flex flex-col gap-3">
              {completedReviews.map((review) => (
                <CompletedReviewCard key={review.id} review={review} />
              ))}
            </div>
          </>
        )}
      </section>
    );
  }

  if (reviews.length === 0) {
    return <EmptyReviews message={EMPTY_MESSAGES[tab]} />;
  }

  if (tab === "completed") {
    return (
      <div className="flex flex-col gap-3">
        {reviews.map((review) => (
          <CompletedReviewCard key={review.id} review={review} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;
