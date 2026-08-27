import PageHeader from "@/shared/components/page-header";
import { Suspense } from "react";
import { getDueReviewCount, getReviews } from "../queries";
import type { ReviewSearchParams } from "../schemas";
import { parseReviewFilters } from "../schemas";
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
      <PageHeader
        title="Reviews"
        description="Decisions ready for honest reflection. Compare what you predicted with
        what actually happened."
      />
      <Suspense fallback={<ReviewsTabsFallback />}>
        <ReviewsTabs dueCount={dueCount} />
      </Suspense>
      <ReviewsList reviews={reviews} status={filters.status} />
    </main>
  );
};

export default ReviewsView;
