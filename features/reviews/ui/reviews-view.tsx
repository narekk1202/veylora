import { Suspense } from "react";
import { getDueReviewCount, getReviews } from "../queries";
import type { ReviewSearchParams } from "../schemas";
import { parseReviewFilters } from "../schemas";
import ReviewsHeader from "./reviews-header";
import ReviewsList from "./reviews-list";
import ReviewsTabs, { ReviewsTabsFallback } from "./reviews-tabs";

const ReviewsView = async ({
  searchParams,
}: {
  searchParams: ReviewSearchParams;
}) => {
  const filters = parseReviewFilters(searchParams);
  const [reviews, dueCount] = await Promise.all([
    getReviews(filters),
    getDueReviewCount(),
  ]);

  return (
    <main className="page_view">
      <ReviewsHeader />
      <Suspense fallback={<ReviewsTabsFallback />}>
        <ReviewsTabs dueCount={dueCount} />
      </Suspense>
      <ReviewsList reviews={reviews} status={filters.status} />
    </main>
  );
};

export default ReviewsView;
