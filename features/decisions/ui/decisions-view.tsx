import PageHeader from "@/shared/components/page-header";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { getDecisions } from "../queries";
import type { DecisionSearchParams } from "../schemas";
import { parseDecisionFilters } from "../schemas";
import DecisionCardSkeletons from "./decision-card-skeletons";
import DecisionsFilters, {
  DecisionsFiltersFallback,
} from "./decisions-filters";
import DecisionsList from "./decisions-list";
import EmptyDecisions from "./empty-decisions";

const DecisionsView = async ({
  searchParams,
}: {
  searchParams: DecisionSearchParams;
}) => {
  const filters = parseDecisionFilters(searchParams);
  const decisions = await getDecisions(filters);

  return (
    <main className="page_view">
      {/* <DecisionsHeader /> */}
      <PageHeader
        title="Decisions"
        description="Your full decision archive — locked, in progress, and reviewed."
        render={
          <Link
            href="/decisions/new"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 w-44.5 max-sm:w-full",
            )}
          >
            New decision
          </Link>
        }
      />
      <Suspense fallback={<DecisionsFiltersFallback />}>
        <DecisionsFilters />
      </Suspense>
      {decisions.length > 0 ? (
        <Suspense fallback={<DecisionCardSkeletons />}>
          <DecisionsList decisions={decisions} />
        </Suspense>
      ) : (
        <EmptyDecisions />
      )}
    </main>
  );
};

export default DecisionsView;
