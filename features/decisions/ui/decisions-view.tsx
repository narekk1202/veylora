import { Decision } from "../types";
import DecisionsCard from "./decisions-card";
import DecisionsFilters from "./decisions-filters";
import DecisionsHeader from "./decisions-header";

const MOCK_DECISIONS: Decision[] = [
  {
    title: "Should I switch to the Lead Product role?",
    category: "CAREER",
    status: "locked",
    date: new Date(2025, 7, 20),
    confidence: 75,
    reviewInDays: 12,
  },
  {
    title: "Should I invest time in learning Rust?",
    category: "PERSONAL",
    status: "reviewed",
    date: new Date(2025, 7, 18),
    accuracyLabel: "Mostly accurate",
  },
  {
    title: "Changing the project architecture to microservices?",
    category: "FINANCE",
    status: "locked",
    date: new Date(2025, 7, 15),
    confidence: 62,
  },
];

const DecisionsView = () => {
  return (
    <main className="page_view">
      <DecisionsHeader />
      <DecisionsFilters />

      <div className="flex flex-col gap-3">
        {MOCK_DECISIONS.map((decision) => (
          <DecisionsCard key={decision.title} {...decision} />
        ))}
      </div>
    </main>
  );
};

export default DecisionsView;
