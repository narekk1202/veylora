"use client";

import { NewDecisionSchema } from "@/features/decisions/schemas";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Textarea } from "@/shared/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import StepsFooter from "../steps-footer";
import StepsHeading from "../steps-heading";

const fieldLabelClassName =
  "text-muted-foreground text-[10px] font-medium tracking-wider uppercase";

const ReasoningStep = () => {
  const form = useFormContext<NewDecisionSchema>();
  const errors = form.formState.errors;

  return (
    <section className="flex flex-col gap-8">
      <StepsHeading
        category="CAREER"
        title="Why are you leaning this way?"
        description="Structure your internal dialogue. Identifying what you are assuming now will help you see through your biases later."
      />

      <FieldGroup className="gap-6">
        <Field data-invalid={!!errors.primaryReasons}>
          <FieldLabel htmlFor="primary-reasons" className={fieldLabelClassName}>
            Primary reasons
          </FieldLabel>
          <Textarea
            {...form.register("primaryReasons")}
            id="primary-reasons"
            aria-invalid={!!errors.primaryReasons}
            className="min-h-28"
            placeholder="The role offers a significant step up in responsibility and direct influence on the product roadmap. The compensation package is 20% higher, and the team culture seems more aligned with my desire for high-velocity execution."
          />
          {errors.primaryReasons && (
            <FieldError>{errors.primaryReasons.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.potentialConcerns}>
          <FieldLabel
            htmlFor="potential-concerns"
            className={fieldLabelClassName}
          >
            Potential concerns
          </FieldLabel>
          <Textarea
            {...form.register("potentialConcerns")}
            id="potential-concerns"
            aria-invalid={!!errors.potentialConcerns}
            className="min-h-28"
            placeholder="The company is much smaller, which means less job security. I'm also worried about the reported burnout culture in the engineering department, which might affect my direct reports."
          />
          {errors.potentialConcerns && (
            <FieldError>{errors.potentialConcerns.message}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!errors.assumptions}>
          <FieldLabel htmlFor="assumptions" className={fieldLabelClassName}>
            What am I assuming?
          </FieldLabel>
          <Textarea
            {...form.register("assumptions")}
            id="assumptions"
            aria-invalid={!!errors.assumptions}
            className="min-h-28"
            placeholder="I am assuming that the burnout culture is localized to one department and not systemic. I am also assuming the company's funding is as stable as they claimed in the last round."
          />
          {errors.assumptions && (
            <FieldError>{errors.assumptions.message}</FieldError>
          )}
        </Field>
      </FieldGroup>

      <p className="text-muted-foreground/60 text-xs italic">
        Veylora tip: Surfacing assumptions is the single most effective way to
        improve decision accuracy.
      </p>

      <StepsFooter
        callTrigger={form.trigger}
        fields={["primaryReasons", "potentialConcerns", "assumptions"]}
      />
    </section>
  );
};

export default ReasoningStep;
