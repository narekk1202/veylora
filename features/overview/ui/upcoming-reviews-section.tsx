import Link from "next/link";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
} from "@/shared/components/ui/empty";
import type { OverviewReview } from "../types";
import UpcomingReviewCard from "./upcoming-review-card";

type UpcomingReviewsSectionProps = {
  reviews: OverviewReview[];
};

const UpcomingReviewsSection = ({ reviews }: UpcomingReviewsSectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Upcoming reviews
        </h2>
        <Link href="/reviews" className="text-primary text-xs">
          View all
        </Link>
      </div>
      {reviews.length === 0 ? (
        <Empty className="min-h-36 justify-center border">
          <EmptyHeader>
            <EmptyDescription className="text-muted-foreground/70">
              Nothing due yet
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <UpcomingReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcomingReviewsSection;
