"use client";

import { Button } from "@/shared/components/ui/button";
import { newDecision } from "../../libs/stepperize";

const StepsFooter = ({ prev }: { prev?: boolean }) => {
  const stepper = newDecision.useStepper();

  return (
    <div className="border-border/40 flex items-center justify-end gap-2 border-t pt-4">
      <div />
      {prev && (
        <Button className="h-11 px-8" onClick={() => stepper.prev()}>
          Previous
        </Button>
      )}
      <Button className="h-11 px-8" onClick={() => stepper.next()}>
        Next
      </Button>
    </div>
  );
};

export default StepsFooter;
