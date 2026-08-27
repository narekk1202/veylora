"use client";

import { Button } from "@/shared/components/ui/button";
import { PredictionAccuracy } from "@/shared/generated/prisma/enums";
import { cn } from "@/shared/lib/utils";

export const ACCURACY_OPTIONS: {
  value: PredictionAccuracy;
  label: string;
}[] = [
  { value: "INACCURATE", label: "Completely wrong" },
  { value: "MOSTLY_INACCURATE", label: "Mostly inaccurate" },
  { value: "PARTIALLY_ACCURATE", label: "Partially accurate" },
  { value: "MOSTLY_ACCURATE", label: "Mostly accurate" },
  { value: "ACCURATE", label: "Completely accurate" },
];

type AccuracyPickerProps = {
  readOnly?: boolean;
  value: PredictionAccuracy | undefined;
  onChange: (value: PredictionAccuracy) => void;
};

const AccuracyPicker = ({
  value,
  onChange,
  readOnly = false,
}: AccuracyPickerProps) => {
  return (
    <div
      className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
      role="radiogroup"
      aria-label="How accurate was your prediction?"
      aria-readonly={readOnly || undefined}
    >
      {ACCURACY_OPTIONS.map((option) => {
        const isSelected = readOnly ? undefined : value === option.value;
        return (
          <Button
            key={option.value}
            role="radio"
            variant={isSelected ? "default" : "outline"}
            className={cn("h-24")}
            aria-checked={isSelected}
            disabled={readOnly}
            onClick={() => !readOnly && onChange(option.value)}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

export default AccuracyPicker;
