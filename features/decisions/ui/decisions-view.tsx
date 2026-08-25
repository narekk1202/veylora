import { getDecisions } from "../queries";
import DecisionsCard from "./decisions-card";
import DecisionsFilters from "./decisions-filters";
import DecisionsHeader from "./decisions-header";

const DecisionsView = async () => {
  const decisions = await getDecisions();

  if (!decisions.success) {
    return <div>Error: {decisions.error}</div>;
  }

  return (
    <main className="page_view">
      <DecisionsHeader />
      <DecisionsFilters />

      <div className="flex flex-col gap-3">
        {decisions.decisions.map((decision) => (
          <DecisionsCard key={decision.id} {...decision} />
        ))}
      </div>
    </main>
  );
};

export default DecisionsView;
