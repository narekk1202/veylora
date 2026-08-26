"use client";

import { Button } from "@/shared/components/ui/button";
import { ReviewStatus } from "@/shared/generated/prisma/enums";
import Link from "next/link";
import { formatLongDate } from "../../utils";

type ReviewFooterProps = {
  status: ReviewStatus;
  reviewedAt?: Date;
  onComplete?: () => void;
};

const ReviewFooter = ({
  status = ReviewStatus.UPCOMING,
  reviewedAt,
  onComplete,
}: ReviewFooterProps) => {
  if (status === ReviewStatus.COMPLETED) {
    return (
      <footer className="border-border/40 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-xs italic">
          {reviewedAt
            ? `Reviewed ${formatLongDate(reviewedAt)}. Permanently added to your insights.`
            : "This review is permanently added to your insights."}
        </p>
        <Button
          type="button"
          variant="outline"
          className="h-11 shrink-0 px-8"
          render={<Link href="/reviews" />}
        >
          Back to reviews
        </Button>
      </footer>
    );
  }

  return (
    <footer className="border-border/40 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted-foreground text-xs italic">
        This review will be permanently added to your insights.
      </p>
      <Button type="button" className="h-11 shrink-0 px-8" onClick={onComplete}>
        Complete review
      </Button>
    </footer>
  );
};

export default ReviewFooter;
