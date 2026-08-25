import { getDecisions } from "../queries";
import DecisionsCard from "./decisions-card";

const DecisionsList = async () => {
  const decisions = await getDecisions();

  return (
    <div className="flex flex-col gap-3">
      {decisions.map((decision) => (
        <DecisionsCard key={decision.id} {...decision} />
      ))}
    </div>
  );
};

export default DecisionsList;
