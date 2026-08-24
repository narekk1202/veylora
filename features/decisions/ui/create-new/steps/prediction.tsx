"use client";

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
import { addDays, addMonths, format, isSameDay, startOfTomorrow } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMemo, useState } from "react";
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
  const [confidence, setConfidence] = useState(75);
  const [revisitDate, setRevisitDate] = useState(() => addMonths(new Date(), 3));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [prediction, setPrediction] = useState("");

  const formattedRevisitDate = useMemo(
    () => format(revisitDate, "MMMM d, yyyy"),
    [revisitDate],
  );

  return (
    <section className="flex flex-col gap-8">
      <StepsHeading
        title="What do you expect will happen?"
        description="Write out your best prediction of outcomes. Include both intended and unintended consequences. This is where your calibration begins."
      />

      <FieldGroup className="gap-6">
        <Field>
          <div className="flex items-center justify-between gap-4">
            <FieldLabel htmlFor="prediction" className={fieldLabelClassName}>
              My prediction
            </FieldLabel>
            <span className={fieldLabelClassName}>
              {prediction.trim() ? "Drafted" : "Empty"}
            </span>
          </div>
          <Textarea
            id="prediction"
            className="min-h-32"
            value={prediction}
            onChange={(event) => setPrediction(event.target.value)}
            placeholder="If I take the Lead Product role, I expect a steep learning curve for the first 60 days. I predict I will feel stretched but energized by the new scope. By month three, I anticipate having stabilized the roadmap and reduced engineering churn by at least 15% through clearer prioritization."
          />
        </Field>

        <Card>
          <CardHeader>
            <CardTitle>How confident are you?</CardTitle>
            <CardDescription>
              Confidence represents your belief in this specific prediction.
            </CardDescription>
            <CardAction>
              <p className="font-serif text-4xl text-primary tabular-nums">
                {confidence}%
              </p>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Slider
              min={0}
              max={100}
              step={1}
              value={confidence}
              onValueChange={(value) => {
                setConfidence(Array.isArray(value) ? (value[0] ?? 75) : value);
              }}
              aria-label="Prediction confidence"
            />
            <div className="text-muted-foreground flex justify-between gap-2 text-[10px] font-medium tracking-wider uppercase">
              <span>Uncertain</span>
              <span>50%</span>
              <span>Complete certainty</span>
            </div>
          </CardContent>
        </Card>

        <Field>
          <FieldTitle>When should we revisit this?</FieldTitle>
          <FieldDescription>
            We will notify you to review this decision and record the actual
            outcome.
          </FieldDescription>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full justify-start"
                />
              }
            >
              <CalendarIcon data-icon="inline-start" />
              {formattedRevisitDate}
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto">
              <Calendar
                mode="single"
                selected={revisitDate}
                onSelect={(date) => {
                  if (!date) {
                    return;
                  }

                  setRevisitDate(date);
                  setIsCalendarOpen(false);
                }}
                disabled={{ before: startOfTomorrow() }}
              />
            </PopoverContent>
          </Popover>
          <div className="flex flex-wrap gap-2">
            {REVISIT_PRESETS.map((preset) => {
              const presetDate = preset.getDate();
              const isActive = isSameDay(presetDate, revisitDate);

              return (
                <Button
                  key={preset.label}
                  type="button"
                  variant={isActive ? "outline" : "ghost"}
                  aria-pressed={isActive}
                  className={cn("text-muted-foreground", {
                    "bg-foreground/10 text-foreground": isActive,
                  })}
                  onClick={() => setRevisitDate(presetDate)}
                >
                  {preset.label}
                </Button>
              );
            })}
          </div>
          <FieldDescription>
            We&apos;ll check back on {formattedRevisitDate}.
          </FieldDescription>
        </Field>
      </FieldGroup>

      <p className="text-muted-foreground/60 text-xs italic">
        Veylora tip: A dated prediction is how you train your judgment — revisit
        and record what actually happened.
      </p>

      <StepsFooter />
    </section>
  );
};

export default PredictionStep;
