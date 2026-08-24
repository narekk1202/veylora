import { defineStepper } from "@stepperize/react";

export const newDecision = defineStepper([
  { id: "situation", title: "Situation" },
  { id: "options", title: "Options" },
  { id: "reasoning", title: "Reasoning" },
  { id: "prediction", title: "Prediction" },
  { id: "summary", title: "Summary" },
  { id: "locked", title: "Locked" },
]);
