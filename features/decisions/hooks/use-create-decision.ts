import { toast } from "@/shared/components/ui/toast";
import { useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { newDecision } from "../libs/stepperize";
import { NewDecisionSchema } from "../schemas";

export const useCreateDecision = () => {
  const form = useFormContext<NewDecisionSchema>();
  const [isPending, startTransition] = useTransition();
  const stepper = newDecision.useStepper();

  const onSubmit = (data: NewDecisionSchema) => {
    startTransition(async () => {
      const response = await fetch("/api/decisions", {
        method: "POST",
        body: JSON.stringify({ decision: data }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.add({
          type: "error",
          description: error.error,
        });
        return;
      }

      stepper.next();
    });
  };

  return {
    form,
    onSubmit,
    isPending,
    errors: form.formState.errors,
  };
};
