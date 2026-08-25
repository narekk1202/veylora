import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import { Decision } from "@/shared/generated/prisma/client";
import { format } from "date-fns";

const DecisionHeader = ({ decision }: { decision: Decision }) => {
  const category = CATEGORY_CONFIG[decision.category];

  return (
    <header className="border-b pb-6">
      <div className="flex items-start justify-between gap-5">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-semibold tracking-wider uppercase">
            <span className="text-muted-foreground">{decision.status}</span>
            <span style={{ color: category.color }}>{category.name}</span>
          </div>
          <h1 className="max-w-4xl font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            {decision.question}
          </h1>
        </div>
        <div className="shrink-0 text-right">
          <p
            className="font-serif text-3xl leading-none"
            style={{ color: CATEGORY_CONFIG.FINANCE.color }}
          >
            {decision.confidence}%
          </p>
          <p className="text-muted-foreground mt-1 text-[10px] font-semibold tracking-wider uppercase">
            Confidence
          </p>
        </div>
      </div>
      <div className="text-muted-foreground mt-5 flex flex-wrap gap-x-10 gap-y-2 text-xs">
        <p>Created {format(decision.createdAt, "MMM d, yyyy")}</p>
        <p>Review scheduled for {format(decision.reviewDate, "MMM d, yyyy")}</p>
      </div>
    </header>
  );
};

export default DecisionHeader;
