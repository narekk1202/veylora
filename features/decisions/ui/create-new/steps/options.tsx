"use client";

import { useDecisionOptions } from "@/features/decisions/hooks/use-decision-options";
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { XIcon } from "lucide-react";
import StepsFooter from "../steps-footer";
import StepsHeading from "../steps-heading";

const OptionsStep = () => {
  const {
    form,
    errors,
    options,
    selectedId,
    setSelectedId,
    handleOnChange,
    handleOnDelete,
    handleOnAdd,
  } = useDecisionOptions();

  return (
    <section className="flex flex-col gap-8">
      <StepsHeading
        category="CAREER"
        title="What are your options?"
        description="List the paths you're seriously considering. Be honest—include options you might dismiss out of habit."
      />

      <div className="flex flex-col gap-3">
        <FieldSet>
          <FieldLegend className="sr-only">Your options</FieldLegend>
          <RadioGroup
            value={selectedId}
            onValueChange={setSelectedId}
            className="flex flex-col gap-2"
          >
            <FieldGroup className="gap-2">
              {options.map((option, index) => (
                <Field
                  key={option.id}
                  orientation="horizontal"
                  className="h-11 items-center gap-3 rounded-lg border px-3"
                >
                  <RadioGroupItem value={option.id} />
                  <Input
                    aria-label={`Option ${index + 1}`}
                    value={option.label}
                    placeholder="Describe this option"
                    className="h-auto border-0 bg-transparent px-0 focus-visible:ring-0 dark:bg-transparent"
                    onChange={(event) => handleOnChange(event, option)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete option ${index + 1}`}
                    disabled={options.length === 2}
                    onClick={() => handleOnDelete(option)}
                  >
                    <XIcon />
                  </Button>
                </Field>
              ))}
            </FieldGroup>
          </RadioGroup>
          {errors.options && <FieldError>{errors.options.message}</FieldError>}
          {errors.selectedOptionId && (
            <FieldError>{errors.selectedOptionId.message}</FieldError>
          )}
        </FieldSet>

        <Button
          type="button"
          variant="outline"
          className="h-11 w-full border-dashed"
          onClick={handleOnAdd}
        >
          Add option
        </Button>

        <p className="text-muted-foreground/60 text-[10px] font-medium tracking-wider uppercase">
          Select the radio button to mark your current choice.
        </p>
      </div>

      <StepsFooter callTrigger={form.trigger} fields={["options", "selectedOptionId"]} />
    </section>
  );
};

export default OptionsStep;
