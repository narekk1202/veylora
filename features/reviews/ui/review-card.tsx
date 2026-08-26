import { Card } from "@/shared/components/ui/card";
import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { ReviewWithDecision } from "../types";
import {
  formatReviewUrgencyLabel,
  formatShortDate,
  isReviewOpenForCompletion,
} from "../utils";

type ReviewCardProps = {
  review: ReviewWithDecision;
  className?: string;
};

const ReviewCard = ({ review, className }: ReviewCardProps) => {
  const isDue = review.status === "DUE";
  const isOverdue = review.status === "OVERDUE";
  const canStart = isReviewOpenForCompletion(review.status);
  const categoryMeta = CATEGORY_CONFIG[review.decision.category];
  const urgencyLabel = formatReviewUrgencyLabel(review.decision.reviewDate);
  const meta = canStart
    ? `Locked ${formatShortDate(review.decision.createdAt)} · Review date was ${formatShortDate(review.decision.reviewDate)}`
    : `Locked ${formatShortDate(review.decision.createdAt)} · ${review.decision.confidence}% confidence at lock`;
  const actionLabel = canStart ? "Start review" : "Preview";

  return (
    <Link href={`/reviews/${review.id}`}>
      <Card
        className={cn(
          "cursor-pointer flex-row items-center gap-4 border-2 px-4 py-4 transition-colors sm:gap-5",
          isDue
            ? "border-chart-4/20 hover:border-chart-4/40 bg-chart-4/7"
            : "border-foreground/10 hover:border-foreground/20",
          isOverdue &&
            "border-destructive hover:border-destructive/40 bg-destructive/7",
          className,
        )}
      >
        <span
          className={cn(
            "size-10 shrink-0 rounded-full border-2",
            isDue ? "border-chart-4" : "border-muted-foreground/35",
          )}
          aria-hidden
        />

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "text-[11px] font-semibold tracking-wider uppercase",
                isDue ? "text-chart-4" : "text-muted-foreground",
              )}
            >
              {urgencyLabel}
            </span>
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase"
              style={{
                backgroundColor: `${categoryMeta.color}33`,
                color: categoryMeta.color,
              }}
            >
              {categoryMeta.name}
            </span>
          </div>

          <p className="text-sm leading-snug font-medium text-pretty sm:text-[15px]">
            {review.decision.question}
          </p>

          <p className="text-muted-foreground text-xs">{meta}</p>
        </div>

        <span
          className={cn(
            "hidden shrink-0 text-sm whitespace-nowrap sm:inline",
            isDue ? "text-foreground/90" : "text-muted-foreground",
          )}
        >
          {actionLabel} →
        </span>
      </Card>
    </Link>
  );
};

export default ReviewCard;
