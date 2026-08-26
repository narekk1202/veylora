import { Card } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import type { CompletedReview } from "../types";
import { formatAccuracyLabel, formatShortDate } from "../utils";

type CompletedReviewCardProps = {
  review: CompletedReview;
  className?: string;
};

const CompletedReviewCard = ({
  review,
  className,
}: CompletedReviewCardProps) => {
  return (
    <Link href={`/decisions/${review.id}`}>
      <Card
        className={cn(
          "border-foreground/10 hover:ring-foreground/20 gap-1.5 border px-4 py-4 transition-colors",
          className,
        )}
      >
        <p className="text-sm leading-snug font-medium text-pretty">
          {review.question}
        </p>
        <p className="text-muted-foreground text-xs">
          Reviewed {formatShortDate(review.reviewedAt)} · Rated{" "}
          {formatAccuracyLabel(review.accuracy)}
        </p>
      </Card>
    </Link>
  );
};

export default CompletedReviewCard;
