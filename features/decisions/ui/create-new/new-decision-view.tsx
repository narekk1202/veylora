"use client";

import { newDecision } from "../../libs/stepperize";
import NewDecisionStepper from "./new-decision-stepper";
import SituationStep from "./steps/situation";

const NewDecisionView = () => {
  const stepper = newDecision.useStepper();

  return (
    <main className="page_view gap-12">
      <NewDecisionStepper />
      {stepper.match({
        situation: () => <SituationStep />,
        options: () => null,
        reasoning: () => null,
        prediction: () => null,
        summary: () => null,
      })}
    </main>
  );
};

export default NewDecisionView;
