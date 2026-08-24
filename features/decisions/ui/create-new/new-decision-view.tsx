"use client";

import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { startOfTomorrow } from "date-fns";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { newDecision } from "../../libs/stepperize";
import { newDecisionSchema, NewDecisionSchema } from "../../schemas";
import NewDecisionStepper from "./new-decision-stepper";
import LockedStep from "./steps/locked";
import OptionsStep from "./steps/options";
import PredictionStep from "./steps/prediction";
import ReasoningStep from "./steps/reasoning";
import SituationStep from "./steps/situation";
import SummaryStep from "./steps/summary";

const NewDecisionView = () => {
  const [reviewDate] = useState(startOfTomorrow);

  const form = useForm<NewDecisionSchema>({
    resolver: zodResolver(newDecisionSchema),
    defaultValues: {
      category: CATEGORY_CONFIG.CAREER.id,
      question: "",
      context: "",
      urgency: "",
      options: [
        { id: crypto.randomUUID(), label: "" },
        { id: crypto.randomUUID(), label: "" },
      ],
      selectedOptionId: "",
      primaryReasons: "",
      potentialConcerns: "",
      assumptions: "",
      predictions: "",
      confidence: 0,
      reviewDate,
    },
    mode: "onChange",
  });

  return (
    <FormProvider {...form}>
      <newDecision.Provider>
        <NewDecisionContent />
      </newDecision.Provider>
    </FormProvider>
  );
};

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
