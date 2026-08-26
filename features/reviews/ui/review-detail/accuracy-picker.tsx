"use client";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import type { ReviewAccuracyChoice } from "../../types";

export const ACCURACY_OPTIONS: {
  value: ReviewAccuracyChoice;
  label: string;
}[] = [
  { value: "completely_wrong", label: "Completely wrong" },
  { value: "partially_accurate", label: "Partially accurate" },
  { value: "mostly_accurate", label: "Mostly accurate" },
  { value: "completely_accurate", label: "Completely accurate" },
];

type AccuracyPickerProps = {
  value: ReviewAccuracyChoice | null;
  onChange?: (value: ReviewAccuracyChoice) => void;
  readOnly?: boolean;
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
        const selected = value === option.value;

        return (
          <Button
            key={option.value}
            role="radio"
            variant={selected ? "default" : "outline"}
            className={cn("h-24")}
            aria-checked={selected}
            disabled={readOnly}
            onClick={() => {
              if (!readOnly) onChange?.(option.value);
            }}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

export default AccuracyPicker;
