import { Card } from "@/shared/components/ui/card";
import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import { Decision } from "@/shared/generated/prisma/client";
import { cn } from "@/shared/lib/utils";
import { formatDate } from "date-fns";
import Link from "next/link";

interface DecisionsCardProps extends Decision {
  className?: string;
}

const DecisionsCard = ({
  id,
  question,
  category,
  status,
  confidence,
  accuracy,
  reviewDate,
  createdAt,
  className,
}: DecisionsCardProps) => {
  const categoryMeta = CATEGORY_CONFIG[category];
  const categoryColor = categoryMeta.color;
  const categoryLabel = categoryMeta.name.toUpperCase();

  return (
    <Link href={`/decisions/${id}`}>
      <Card
        className={cn(
          "ring-foreground/5 cursor-pointer flex-row items-center gap-4 px-4 py-4",
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
              {formatDate(createdAt, "MMM d, yyyy")}
            </span>
          </div>
          <p className="text-sm leading-snug font-medium">{question}</p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-0.5 text-right">
          {status === "LOCKED" && confidence !== undefined ? (
            <span
              className="text-sm font-semibold tabular-nums"
              style={{ color: CATEGORY_CONFIG.FINANCE.color }}
            >
              {confidence}%
            </span>
          ) : null}
          {status === "REVIEWED" && accuracy ? (
            <span
              className="text-sm font-medium"
              style={{ color: CATEGORY_CONFIG.PERSONAL.color }}
            >
              {accuracy}
            </span>
          ) : null}
          {reviewDate !== undefined ? (
            <span className="text-muted-foreground text-xs">
              Review in {formatDate(reviewDate, "MMM d, yyyy")}
            </span>
          ) : null}
        </div>
      </Card>
    </Link>
  );
};

export default DecisionsCard;
