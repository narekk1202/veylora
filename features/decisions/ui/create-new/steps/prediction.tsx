"use client";

import { NewDecisionSchema } from "@/features/decisions/schemas";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/shared/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Slider } from "@/shared/components/ui/slider";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";
import {
  addDays,
  addMonths,
  format,
  isSameDay,
  startOfTomorrow,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import StepsFooter from "../steps-footer";
import StepsHeading from "../steps-heading";

const fieldLabelClassName =
  "text-muted-foreground text-[10px] font-medium tracking-wider uppercase";

const REVISIT_PRESETS = [
  { label: "2 weeks", getDate: () => addDays(new Date(), 14) },
  { label: "1 month", getDate: () => addMonths(new Date(), 1) },
  { label: "3 months", getDate: () => addMonths(new Date(), 3) },
  { label: "6 months", getDate: () => addMonths(new Date(), 6) },
] as const;

const PredictionStep = () => {
  const form = useFormContext<NewDecisionSchema>();
  const errors = form.formState.errors;
  const predictions = useWatch({
    control: form.control,
    name: "predictions",
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <section className="flex flex-col gap-8">
      <StepsHeading
        title="What do you expect will happen?"
        description="Write out your best prediction of outcomes. Include both intended and unintended consequences. This is where your calibration begins."
      />

      <FieldGroup className="gap-6">
        <Field data-invalid={!!errors.predictions}>
          <div className="flex items-center justify-between gap-4">
            <FieldLabel htmlFor="prediction" className={fieldLabelClassName}>
              My prediction
            </FieldLabel>
            <span className={fieldLabelClassName}>
              {predictions.trim() ? "Drafted" : "Empty"}
            </span>
          </div>
          <Textarea
            {...form.register("predictions")}
            id="prediction"
            className="min-h-32"
            aria-invalid={!!errors.predictions}
            placeholder="If I take the Lead Product role, I expect a steep learning curve for the first 60 days. I predict I will feel stretched but energized by the new scope. By month three, I anticipate having stabilized the roadmap and reduced engineering churn by at least 15% through clearer prioritization."
          />
          {errors.predictions && (
            <FieldError>{errors.predictions.message}</FieldError>
          )}
        </Field>

        <Controller
          name="confidence"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Card>
                <CardHeader>
                  <CardTitle>How confident are you?</CardTitle>
                  <CardDescription>
                    Confidence represents your belief in this specific
                    prediction.
                  </CardDescription>
                  <CardAction>
                    <p className="text-primary font-serif text-4xl tabular-nums">
                      {field.value}%
                    </p>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(
                        Array.isArray(value) ? (value[0] ?? 0) : value,
                      );
                    }}
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                    aria-label="Prediction confidence"
                  />
                  <div className="text-muted-foreground flex justify-between gap-2 text-[10px] font-medium tracking-wider uppercase">
                    <span>Uncertain</span>
                    <span>50%</span>
                    <span>Complete certainty</span>
                  </div>
                </CardContent>
              </Card>
              {fieldState.error && (
                <FieldError>{fieldState.error.message}</FieldError>
              )}
            </Field>
          )}
        />

        <Controller
          name="reviewDate"
          control={form.control}
          render={({ field, fieldState }) => {
            const formattedRevisitDate = format(field.value, "MMMM d, yyyy");

            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldTitle>When should we revisit this?</FieldTitle>
                <FieldDescription>
                  We will notify you to review this decision and record the
                  actual outcome.
                </FieldDescription>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger
                    render={
                      <Button
                        ref={field.ref}
                        type="button"
                        variant="outline"
                        className="h-11 w-full justify-start"
                        aria-invalid={fieldState.invalid}
                      />
                    }
                  >
                    <CalendarIcon data-icon="inline-start" />
                    {formattedRevisitDate}
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (!date) {
                          return;
                        }

                        field.onChange(date);
                      }}
                      disabled={{ before: startOfTomorrow() }}
                    />
                  </PopoverContent>
                </Popover>
                <div className="flex flex-wrap gap-2">
                  {REVISIT_PRESETS.map((preset) => {
                    const presetDate = preset.getDate();
                    const isActive = isSameDay(presetDate, field.value);

                    return (
                      <Button
                        key={preset.label}
                        type="button"
                        variant={isActive ? "outline" : "ghost"}
                        aria-pressed={isActive}
                        className={cn("text-muted-foreground", {
                          "bg-foreground/10 text-foreground": isActive,
                        })}
                        onClick={() => field.onChange(presetDate)}
                      >
                        {preset.label}
                      </Button>
                    );
                  })}
                </div>
                <FieldDescription>
                  We&apos;ll check back on {formattedRevisitDate}.
                </FieldDescription>
                {fieldState.error && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            );
          }}
        />
      </FieldGroup>

      <p className="text-muted-foreground/60 text-xs italic">
        Veylora tip: A dated prediction is how you train your judgment — revisit
        and record what actually happened.
      </p>

      <StepsFooter
        callTrigger={form.trigger}
        fields={["predictions", "confidence", "reviewDate"]}
      />
    </section>
  );
};

export default PredictionStep;
