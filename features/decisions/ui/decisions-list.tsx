import type { DecisionFilters } from "../schemas";
import { getDecisions } from "../queries";
import DecisionsCard from "./decisions-card";

const DecisionsList = async ({ filters }: { filters: DecisionFilters }) => {
  const decisions = await getDecisions(filters);

  return (
    <div className="flex flex-col gap-3">
      {decisions.map((decision) => (
        <DecisionsCard key={decision.id} {...decision} />
      ))}
    </div>
  );
};

export default DecisionsList;
