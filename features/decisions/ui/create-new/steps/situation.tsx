"use client";

import { NewDecisionSchema } from "@/features/decisions/schemas";
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { CATEGORIES } from "@/shared/constants/catergories.consts";
import { cn } from "@/shared/lib/utils";
import { useFormContext } from "react-hook-form";
import StepsFooter from "../steps-footer";
import StepsHeading from "../steps-heading";

const fieldLabelClassName =
  "text-muted-foreground text-[10px] font-medium tracking-wider uppercase";

const SituationStep = () => {
  const form = useFormContext<NewDecisionSchema>();
  const errors = form.formState.errors;

  return (
    <section className="flex flex-col gap-8">
      <StepsHeading
        title="What are you deciding?"
        description="Name the decision clearly. Capture enough context that your future self understands what you were facing — not just the headline."
      />

      <FieldGroup className="gap-6">
        <Field>
          <FieldLabel className={fieldLabelClassName}>Category</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((option) => {
              const isSelected = form.watch("category") === option.id;

              return (
                <Button
                  key={option.id}
                  type="button"
                  aria-pressed={isSelected}
                  variant={isSelected ? "outline" : "ghost"}
                  className={cn("text-muted-foreground", {
                    "text-foreground bg-foreground/10": isSelected,
                  })}
                  onClick={() => form.setValue("category", option.id)}
                >
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                  {option.name}
                </Button>
              );
            })}
          </div>
        </Field>

        <Field data-invalid={!!errors.question}>
          <FieldLabel
            htmlFor="decision-question"
            className={fieldLabelClassName}
          >
            Decision question
          </FieldLabel>
          <Input
            {...form.register("question")}
            id="decision-question"
            aria-invalid={!!errors.question}
            placeholder="Should I accept the senior role at Startup X or stay at Company Y?"
            className="h-auto min-h-11 py-3 font-serif font-medium italic"
          />
          {errors.question && (
            <FieldError>{errors.question.message}</FieldError>
          )}
          <p className="text-muted-foreground/60 text-xs italic">
            Write the question as if you&apos;re explaining it to a friend six
            months from now.
          </p>
        </Field>

        <Field data-invalid={!!errors.context}>
          <FieldLabel
            htmlFor="decision-context"
            className={fieldLabelClassName}
          >
            Context & background
          </FieldLabel>
          <Textarea
            {...form.register("context")}
            id="decision-context"
            className="min-h-28"
            aria-invalid={!!errors.context}
            placeholder="We just had our quarterly review, and the new role offers more equity but requires relocating..."
          />
          {errors.context && <FieldError>{errors.context.message}</FieldError>}
        </Field>

        <Field data-invalid={!!errors.urgency}>
          <FieldLabel
            htmlFor="decision-urgency"
            className={fieldLabelClassName}
          >
            Why does this matter now?
          </FieldLabel>
          <Textarea
            {...form.register("urgency")}
            id="decision-urgency"
            aria-invalid={!!errors.urgency}
            className="min-h-20"
            placeholder="The offer expires this Friday."
          />
          {errors.urgency && <FieldError>{errors.urgency.message}</FieldError>}
        </Field>
      </FieldGroup>
      <p className="text-muted-foreground/60 text-xs italic">
        Veylora tip: A clear question now makes hindsight reviews far more
        honest later.
      </p>
      <StepsFooter
        callTrigger={form.trigger}
        fields={["category", "question", "context", "urgency"]}
      />
    </section>
  );
};

export default SituationStep;
