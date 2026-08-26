import { Card } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { ReviewWithDecision } from "../types";
import { formatAccuracyLabel, formatShortDate } from "../utils";

type CompletedReviewCardProps = {
  review: ReviewWithDecision;
  className?: string;
};

const CompletedReviewCard = ({
  review,
  className,
}: CompletedReviewCardProps) => {
  return (
    <Link href={`/reviews/${review.id}`}>
      <Card
        className={cn(
          "border-foreground/10 hover:ring-foreground/20 gap-1.5 border px-4 py-4 transition-colors",
          className,
        )}
      >
        <p className="text-sm leading-snug font-medium text-pretty">
          {review.decision.question}
        </p>
        <p className="text-muted-foreground text-xs">
          Reviewed {formatShortDate(review.decision.reviewedAt!)} · Rated{" "}
          {formatAccuracyLabel(review.accuracy || "INACCURATE")}
        </p>
      </Card>
    </Link>
  );
};

export default CompletedReviewCard;
