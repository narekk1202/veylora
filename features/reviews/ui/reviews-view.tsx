"use client";

import { useState } from "react";
import { MOCK_COMPLETED_REVIEWS, MOCK_PENDING_REVIEWS } from "../mock-data";
import type { ReviewTab } from "../types";
import CompletedReviewCard from "./completed-review-card";
import EmptyReviews from "./empty-reviews";
import ReviewCard from "./review-card";
import ReviewsHeader from "./reviews-header";
import ReviewsTabs from "./reviews-tabs";

const EMPTY_MESSAGES: Record<ReviewTab, string> = {
  all: "No reviews yet.",
  due: "No reviews due right now.",
  upcoming: "No upcoming reviews scheduled.",
  completed: "No completed reviews yet.",
};

const ReviewsView = () => {
  const [tab, setTab] = useState<ReviewTab>("all");

  const dueReviews = MOCK_PENDING_REVIEWS.filter((r) => r.urgency === "due");
  const upcomingReviews = MOCK_PENDING_REVIEWS.filter(
    (r) => r.urgency === "upcoming",
  );

  return (
    <main className="page_view">
      <ReviewsHeader />
      <ReviewsTabs
        value={tab}
        dueCount={dueReviews.length}
        onValueChange={setTab}
      />

      {tab === "all" ? (
        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            {MOCK_PENDING_REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {MOCK_COMPLETED_REVIEWS.length > 0 && (
            <>
              <h2 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Recently completed
              </h2>
              <div className="flex flex-col gap-3">
                {MOCK_COMPLETED_REVIEWS.map((review) => (
                  <CompletedReviewCard key={review.id} review={review} />
                ))}
              </div>
            </>
          )}
        </section>
      ) : null}

      {tab === "due" ? (
        dueReviews.length > 0 ? (
          <div className="flex flex-col gap-3">
            {dueReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <EmptyReviews message={EMPTY_MESSAGES.due} />
        )
      ) : null}

      {tab === "upcoming" ? (
        upcomingReviews.length > 0 ? (
          <div className="flex flex-col gap-3">
            {upcomingReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <EmptyReviews message={EMPTY_MESSAGES.upcoming} />
        )
      ) : null}

      {tab === "completed" ? (
        MOCK_COMPLETED_REVIEWS.length > 0 ? (
          <div className="flex flex-col gap-3">
            {MOCK_COMPLETED_REVIEWS.map((review) => (
              <CompletedReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <EmptyReviews message={EMPTY_MESSAGES.completed} />
        )
      ) : null}
    </main>
  );
};

export default ReviewsView;
