import { Suspense } from "react";
import DecisionCardSkeletons from "./decision-card-skeletons";
import DecisionsFilters from "./decisions-filters";
import DecisionsHeader from "./decisions-header";
import DecisionsList from "./decisions-list";

const DecisionsView = () => {
  return (
    <main className="page_view">
      <DecisionsHeader />
      <DecisionsFilters />

      <Suspense fallback={<DecisionCardSkeletons />}>
        <DecisionsList />
      </Suspense>
    </main>
  );
};

export default DecisionsView;
