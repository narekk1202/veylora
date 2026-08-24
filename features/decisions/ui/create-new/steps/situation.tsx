"use client";

import { CATEGORY_OPTIONS } from "@/features/decisions/consts";
import type { DecisionCategory } from "@/features/decisions/types";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import StepsFooter from "../steps-footer";
import StepsHeading from "../steps-heading";

const fieldLabelClassName =
  "text-muted-foreground text-[10px] font-medium tracking-wider uppercase";

const SituationStep = () => {
  const [category, setCategory] = useState<DecisionCategory>("CAREER");

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
            {CATEGORY_OPTIONS.map((option) => {
              const isSelected = category === option.id;

              return (
                <Button
                  key={option.id}
                  type="button"
                  aria-pressed={isSelected}
                  variant={isSelected ? "outline" : "ghost"}
                  className={cn("text-muted-foreground", {
                    "text-foreground bg-foreground/10": isSelected,
                  })}
                  onClick={() => setCategory(option.id)}
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

        <Field>
          <FieldLabel
            htmlFor="decision-question"
            className={fieldLabelClassName}
          >
            Decision question
          </FieldLabel>
          <Input
            id="decision-question"
            placeholder="Should I accept the senior role at Startup X or stay at Company Y?"
            className="h-auto min-h-11 py-3 font-serif font-medium italic"
          />
          <p className="text-muted-foreground/60 text-xs italic">
            Write the question as if you&apos;re explaining it to a friend six
            months from now.
          </p>
        </Field>

        <Field>
          <FieldLabel
            htmlFor="decision-context"
            className={fieldLabelClassName}
          >
            Context & background
          </FieldLabel>
          <Textarea
            id="decision-context"
            className="min-h-28"
            placeholder="We just had our quarterly review, and the new role offers more equity but requires relocating..."
          />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="decision-urgency"
            className={fieldLabelClassName}
          >
            Why does this matter now?
          </FieldLabel>
          <Textarea
            id="decision-urgency"
            className="min-h-20"
            placeholder="The offer expires this Friday."
          />
        </Field>
      </FieldGroup>

      <p className="text-muted-foreground/60 text-xs italic">
        Veylora tip: A clear question now makes hindsight reviews far more
        honest later.
      </p>

      <StepsFooter />
    </section>
  );
};

export default SituationStep;
