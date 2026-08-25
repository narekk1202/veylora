import { toast } from "@/shared/components/ui/toast";
import { useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { createDecision } from "../actions";
import { newDecision } from "../libs/stepperize";
import { NewDecisionSchema } from "../schemas";

export const useCreateDecision = () => {
  const form = useFormContext<NewDecisionSchema>();
  const [isPending, startTransition] = useTransition();
  const stepper = newDecision.useStepper();

  const onSubmit = (data: NewDecisionSchema) => {
    startTransition(async () => {
      const result = await createDecision(data);

      if (!result.success) {
        toast.add({
          type: "error",
          description: result.error,
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
