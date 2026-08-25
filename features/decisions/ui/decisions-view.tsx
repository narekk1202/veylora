import { Suspense } from "react";
import type { DecisionSearchParams } from "../schemas";
import { parseDecisionFilters } from "../schemas";
import DecisionCardSkeletons from "./decision-card-skeletons";
import DecisionsFilters, {
  DecisionsFiltersFallback,
} from "./decisions-filters";
import DecisionsHeader from "./decisions-header";
import DecisionsList from "./decisions-list";

const DecisionsView = ({
  searchParams,
}: {
  searchParams: DecisionSearchParams;
}) => {
  const filters = parseDecisionFilters(searchParams);

  return (
    <main className="page_view">
      <DecisionsHeader />
      <Suspense fallback={<DecisionsFiltersFallback />}>
        <DecisionsFilters />
      </Suspense>

      <Suspense fallback={<DecisionCardSkeletons />}>
        <DecisionsList filters={filters} />
      </Suspense>
    </main>
  );
};

export default DecisionsView;
