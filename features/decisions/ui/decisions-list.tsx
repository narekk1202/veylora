import { Decision } from "@/shared/generated/prisma/client";
import DecisionsCard from "./decisions-card";

const DecisionsList = ({ decisions }: { decisions: Decision[] }) => {
  return (
    <div className="flex flex-col gap-3">
      {decisions.map((decision) => (
        <DecisionsCard key={decision.id} {...decision} />
      ))}
    </div>
  );
};

export default DecisionsList;
