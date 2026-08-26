"use client";

import { Button } from "@/shared/components/ui/button";
import { PredictionAccuracy } from "@/shared/generated/prisma/enums";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";

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
  value: PredictionAccuracy;
  readOnly?: boolean;
};

const AccuracyPicker = ({ value, readOnly = false }: AccuracyPickerProps) => {
  const [selected, setSelected] = useState<PredictionAccuracy>(value);

  return (
    <div
      className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
      role="radiogroup"
      aria-label="How accurate was your prediction?"
      aria-readonly={readOnly || undefined}
    >
      {ACCURACY_OPTIONS.map((option) => {
        const isSelected = readOnly ? undefined : selected === option.value;
        return (
          <Button
            key={option.value}
            role="radio"
            variant={isSelected ? "default" : "outline"}
            className={cn("h-24")}
            aria-checked={isSelected}
            disabled={readOnly}
            onClick={() => !readOnly && setSelected(option.value)}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

export default AccuracyPicker;
