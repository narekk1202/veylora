import { Card } from "@/shared/components/ui/card";
import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import { cn } from "@/shared/lib/utils";
import { Decision } from "../types";
import { formatDecisionDate } from "../utils";

interface DecisionsCardProps extends Decision {
  className?: string;
}

const DecisionsCard = ({
  title,
  category,
  status,
  date,
  confidence,
  accuracyLabel,
  reviewInDays,
  className,
}: DecisionsCardProps) => {
  const categoryMeta = CATEGORY_CONFIG[category];
  const categoryColor = categoryMeta.color;
  const categoryLabel = categoryMeta.name.toUpperCase();

  return (
    <Card
      className={cn(
        "ring-foreground/5 flex-row items-center gap-4 px-4 py-4",
        className,
      )}
    >
      <div
        className="size-10 shrink-0 rounded-lg"
        style={{ backgroundColor: `${categoryColor}33` }}
        aria-hidden
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider"
            style={{
              backgroundColor: `${categoryColor}33`,
              color: categoryColor,
            }}
          >
            {categoryLabel}
          </span>
          <span className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
            {status}
            <span className="mx-1.5">·</span>
            {formatDecisionDate(date)}
          </span>
        </div>
        <p className="text-sm leading-snug font-medium">{title}</p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-0.5 text-right">
        {status === "locked" && confidence !== undefined ? (
          <span
            className="text-sm font-semibold tabular-nums"
            style={{ color: CATEGORY_CONFIG.FINANCE.color }}
          >
            {confidence}%
          </span>
        ) : null}
        {status === "reviewed" && accuracyLabel ? (
          <span
            className="text-sm font-medium"
            style={{ color: CATEGORY_CONFIG.PERSONAL.color }}
          >
            {accuracyLabel}
          </span>
        ) : null}
        {reviewInDays !== undefined ? (
          <span className="text-muted-foreground text-xs">
            Review in {reviewInDays} days
          </span>
        ) : null}
      </div>
    </Card>
  );
};

export default DecisionsCard;
