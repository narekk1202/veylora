import { Card } from "@/shared/components/ui/card";
import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import { ReviewWithDecision } from "../../types";
import { formatLongDate } from "../../utils";

const OriginalDecisionSummary = ({
  review,
}: {
  review: ReviewWithDecision;
}) => {
  const categoryMeta = CATEGORY_CONFIG[review.decision.category];
  const lockedLabel = formatLongDate(review.decision.createdAt);

  return (
    <Card className="ring-foreground/10 gap-0 overflow-hidden p-0">
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_11rem] lg:gap-0">
        <div className="lg:border-foreground/10 flex min-w-0 flex-col gap-5 lg:border-r lg:pr-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase"
              style={{
                backgroundColor: `${categoryMeta.color}33`,
                color: categoryMeta.color,
              }}
            >
              {categoryMeta.name}
            </span>
            <span className="text-muted-foreground text-xs">
              Locked {lockedLabel}
            </span>
          </div>

          <h2 className="text-xl leading-snug font-medium text-pretty sm:text-2xl">
            {review.decision.question}
          </h2>

          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
              Original prediction
            </p>
            <blockquote className="border-primary/70 text-muted-foreground border-l-2 pl-4 text-sm leading-relaxed italic sm:text-[15px]">
              “{review.decision.predictions}”
            </blockquote>
          </div>
        </div>

        <div className="border-foreground/10 flex flex-col items-center justify-center gap-2 border-t pt-5 lg:border-t-0 lg:pt-0 lg:pl-6">
          <p className="font-serif text-4xl tabular-nums sm:text-5xl">
            {review.decision.confidence}%
          </p>
          <p className="text-muted-foreground text-center text-[10px] font-semibold tracking-wider uppercase">
            Original confidence
          </p>
          <div
            className="bg-muted mt-2 h-1.5 w-full max-w-36 overflow-hidden rounded-full"
            role="meter"
            aria-label="Original confidence"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={review.decision.confidence}
          >
            <div
              className="bg-foreground/70 h-full rounded-full"
              style={{ width: `${review.decision.confidence}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OriginalDecisionSummary;
