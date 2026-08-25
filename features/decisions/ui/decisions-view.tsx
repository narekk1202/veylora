import { Suspense } from "react";
import { getDecisions } from "../queries";
import type { DecisionSearchParams } from "../schemas";
import { parseDecisionFilters } from "../schemas";
import DecisionCardSkeletons from "./decision-card-skeletons";
import DecisionsFilters, {
  DecisionsFiltersFallback,
} from "./decisions-filters";
import DecisionsHeader from "./decisions-header";
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
      <DecisionsHeader />
      {decisions.length > 0 ? (
        <>
          <Suspense fallback={<DecisionsFiltersFallback />}>
            <DecisionsFilters />
          </Suspense>

          <Suspense fallback={<DecisionCardSkeletons />}>
            <DecisionsList decisions={decisions} />
          </Suspense>
        </>
      ) : (
        <EmptyDecisions />
      )}
    </main>
  );
};

export default DecisionsView;
