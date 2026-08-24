"use client";

import { Field, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Textarea } from "@/shared/components/ui/textarea";
import StepsFooter from "../steps-footer";
import StepsHeading from "../steps-heading";

const fieldLabelClassName =
  "text-muted-foreground text-[10px] font-medium tracking-wider uppercase";

const ReasoningStep = () => {
  return (
    <section className="flex flex-col gap-8">
      <StepsHeading
        category="CAREER"
        title="Why are you leaning this way?"
        description="Structure your internal dialogue. Identifying what you are assuming now will help you see through your biases later."
      />

      <FieldGroup className="gap-6">
        <Field>
          <FieldLabel
            htmlFor="primary-reasons"
            className={fieldLabelClassName}
          >
            Primary reasons
          </FieldLabel>
          <Textarea
            id="primary-reasons"
            className="min-h-28"
            placeholder="The role offers a significant step up in responsibility and direct influence on the product roadmap. The compensation package is 20% higher, and the team culture seems more aligned with my desire for high-velocity execution."
          />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="potential-concerns"
            className={fieldLabelClassName}
          >
            Potential concerns
          </FieldLabel>
          <Textarea
            id="potential-concerns"
            className="min-h-28"
            placeholder="The company is much smaller, which means less job security. I'm also worried about the reported burnout culture in the engineering department, which might affect my direct reports."
          />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="assumptions"
            className={fieldLabelClassName}
          >
            What am I assuming?
          </FieldLabel>
          <Textarea
            id="assumptions"
            className="min-h-28"
            placeholder="I am assuming that the burnout culture is localized to one department and not systemic. I am also assuming the company's funding is as stable as they claimed in the last round."
          />
        </Field>
      </FieldGroup>

      <p className="text-muted-foreground/60 text-xs italic">
        Veylora tip: Surfacing assumptions is the single most effective way to
        improve decision accuracy.
      </p>

      <StepsFooter />
    </section>
  );
};

export default ReasoningStep;
