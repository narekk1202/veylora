"use client";

import { Button } from "@/shared/components/ui/button";
import { newDecision } from "../../libs/stepperize";

const StepsFooter = () => {
  const stepper = newDecision.useStepper();

  return (
    <div className="border-border/40 flex items-center justify-end gap-2 border-t pt-4">
      <div />
      {stepper.canPrev && (
        <Button
          className="h-11 px-8"
          variant="outline"
          onClick={() => stepper.prev()}
        >
          Go back
        </Button>
      )}
      {stepper.canNext && (
        <Button className="h-11 px-8" onClick={() => stepper.next()}>
          Continue
        </Button>
      )}
    </div>
  );
};

export default StepsFooter;
