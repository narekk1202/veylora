"use client";

import { cn } from "@/shared/lib/utils";
import { newDecision } from "../../libs/stepperize";
import NewDecisionStepper from "./new-decision-stepper";
import LockedStep from "./steps/locked";
import OptionsStep from "./steps/options";
import PredictionStep from "./steps/prediction";
import ReasoningStep from "./steps/reasoning";
import SituationStep from "./steps/situation";
import SummaryStep from "./steps/summary";

const NewDecisionView = () => (
  <newDecision.Provider>
    <NewDecisionContent />
  </newDecision.Provider>
);

const NewDecisionContent = () => {
  const stepper = newDecision.useStepper();
  const isLocked = stepper.id === "locked";

  return (
    <main className={cn("page_view", isLocked ? "gap-0" : "gap-12")}>
      {isLocked ? null : <NewDecisionStepper />}
      {stepper.match({
        situation: () => <SituationStep />,
        options: () => <OptionsStep />,
        reasoning: () => <ReasoningStep />,
        prediction: () => <PredictionStep />,
        summary: () => <SummaryStep />,
        locked: () => <LockedStep />,
      })}
    </main>
  );
};

export default NewDecisionView;
