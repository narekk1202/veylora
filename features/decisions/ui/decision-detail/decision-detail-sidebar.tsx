import { Card, CardContent } from "@/shared/components/ui/card";
import type { Decision } from "@/shared/generated/prisma/client";
import { format } from "date-fns";
import LifecycleItem from "./lifecycle-item";
import SectionLabel from "./section-label";

export default function DecisionDetailSidebar({
  decision,
}: {
  decision: Decision;
}) {
  const isReviewed = decision.status === "REVIEWED";
  const completedDate = decision.reviewedAt
    ? format(decision.reviewedAt, "MMM d, yyyy")
    : "Pending";

  return (
    <aside className="space-y-6">
      <Card>
        <CardContent>
          <SectionLabel>Decision lifecycle</SectionLabel>
          <ol className="mt-5">
            <LifecycleItem
              active
              complete
              date={format(decision.createdAt, "MMM d, yyyy")}
              label="Created"
            />
            <LifecycleItem
              active
              complete
              date={format(decision.createdAt, "MMM d, yyyy")}
              label="Decision made"
            />
            <LifecycleItem
              active={!isReviewed}
              date={format(decision.reviewDate, "MMM d, yyyy")}
              label="Review scheduled"
            />
            <LifecycleItem
              active={isReviewed}
              complete={isReviewed}
              date={completedDate}
              label="Review completed"
            />
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-3">
          <SectionLabel>Why is this locked?</SectionLabel>
          <p className="text-muted-foreground text-xs leading-5">
            To combat hindsight bias, Veylora prevents editing once a decision
            is finalized. This ensures your record reflects your actual state of
            mind at the time of the choice.
          </p>
        </CardContent>
      </Card>
    </aside>
  );
}
