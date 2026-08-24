"use client";

import { newDecision } from "../../libs/stepperize";
import NewDecisionStepper from "./new-decision-stepper";
import OptionsStep from "./steps/options";
import ReasoningStep from "./steps/reasoning";
import SituationStep from "./steps/situation";

const NewDecisionView = () => (
  <newDecision.Provider>
    <NewDecisionContent />
  </newDecision.Provider>
);

const NewDecisionContent = () => {
  const stepper = newDecision.useStepper();

  return (
    <main className="page_view gap-12">
      <NewDecisionStepper />
      {stepper.match({
        situation: () => <SituationStep />,
        options: () => <OptionsStep />,
        reasoning: () => <ReasoningStep />,
        prediction: () => null,
        summary: () => null,
      })}
    </main>
  );
};

export default NewDecisionView;
