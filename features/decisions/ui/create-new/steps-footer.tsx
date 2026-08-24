"use client";

import { Button } from "@/shared/components/ui/button";
import { Loader2, Lock } from "lucide-react";
import { UseFormTrigger } from "react-hook-form";
import { newDecision } from "../../libs/stepperize";
import { NewDecisionSchema } from "../../schemas";

type StepsFooterProps = {
  isLoading?: boolean;
  isLockStep?: boolean;
  fields: (keyof NewDecisionSchema)[];
  onLock?: () => void;
  callTrigger: UseFormTrigger<NewDecisionSchema>;
};

const StepsFooter = ({
  isLoading = false,
  isLockStep = false,
  callTrigger,
  fields,
  onLock,
}: StepsFooterProps) => {
  const stepper = newDecision.useStepper();

  const handleContinue = async () => {
    const isValid = await callTrigger(fields);
    if (isValid) stepper.next();
  };

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
        <Button className="h-11 px-8" onClick={handleContinue}>
          Continue
        </Button>
      )}
      {isLockStep && (
        <Button className="h-11 px-8" onClick={onLock} disabled={isLoading}>
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Lock />}
          Lock decision
        </Button>
      )}
    </div>
  );
};

export default StepsFooter;
