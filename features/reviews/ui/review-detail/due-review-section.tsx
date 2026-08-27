"use client";

import { Review } from "@/shared/generated/prisma/client";
import DueReviewForm from "./due-review-form";
import ReviewFooter from "./review-footer";

const DueReviewSection = ({ review }: { review: Review }) => {
  return (
    <DueReviewForm reviewId={review.id}>
      {(isPending) => (
        <ReviewFooter status={review.status} isPending={isPending} />
      )}
    </DueReviewForm>
  );
};

export default DueReviewSection;
