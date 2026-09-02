import { Card } from "@/shared/components/ui/card";
import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import { ReviewStatus } from "@/shared/generated/prisma/enums";
import { cn } from "@/shared/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { OverviewReview } from "../types";
import {
  formatCreatedLabel,
  formatReviewDateLabel,
  formatReviewInLabel,
} from "../utils";

type UpcomingReviewCardProps = {
  review: OverviewReview;
};

const UpcomingReviewCard = ({ review }: UpcomingReviewCardProps) => {
  const isDue = review.status === ReviewStatus.DUE;
  const isOverdue = review.status === ReviewStatus.OVERDUE;
  const categoryMeta = CATEGORY_CONFIG[review.decision.category];

  return (
    <Link href={`/reviews/${review.id}`}>
      <Card
        className={cn(
          "cursor-pointer flex-row items-center gap-4 px-4 py-4 transition-colors",
          isDue && "border-chart-4/20 hover:border-chart-4/40 bg-chart-4/7",
          isOverdue &&
            "border-destructive hover:border-destructive/40 bg-destructive/7",
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase"
              style={{
                backgroundColor: `${categoryMeta.color}33`,
                color: categoryMeta.color,
              }}
            >
              {categoryMeta.name}
            </span>
            <p className="min-w-0 truncate text-sm font-medium sm:text-[15px]">
              {review.decision.question}
            </p>
          </div>
          <p className="text-muted-foreground text-xs">
            {formatCreatedLabel(review.decision.createdAt)}
            <span className="mx-1.5">·</span>
            {review.decision.confidence}% Confidence
          </p>
          <p
            className={cn(
              "text-xs font-medium sm:hidden",
              isOverdue ? "text-destructive" : "text-primary",
            )}
          >
            {formatReviewInLabel(review.decision.reviewDate)}
          </p>
        </div>

        <div className="hidden shrink-0 text-right sm:block">
          <p
            className={cn(
              "text-xs font-medium",
              isOverdue ? "text-destructive" : "text-primary",
            )}
          >
            {formatReviewInLabel(review.decision.reviewDate)}
          </p>
          <p className="text-muted-foreground/70 text-[10px] tracking-wider uppercase">
            {formatReviewDateLabel(review.decision.reviewDate)}
          </p>
        </div>

        <ChevronRight
          className="text-muted-foreground hidden size-4 shrink-0 sm:block"
          aria-hidden
        />
      </Card>
    </Link>
  );
};

export default UpcomingReviewCard;
