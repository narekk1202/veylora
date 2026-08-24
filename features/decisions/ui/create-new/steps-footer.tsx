"use client";

import { Button } from "@/shared/components/ui/button";
import { Lock } from "lucide-react";
import { newDecision } from "../../libs/stepperize";

const StepsFooter = ({ isLockStep }: { isLockStep: boolean }) => {
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
      {stepper.canNext && !isLockStep && (
        <Button className="h-11 px-8" onClick={() => stepper.next()}>
          Continue
        </Button>
      )}

      {!stepper.canNext && isLockStep && (
        <Button className="h-11 px-8" onClick={() => stepper.next()}>
          <Lock /> Lock decision
        </Button>
      )}
    </div>
  );
};

export default StepsFooter;
