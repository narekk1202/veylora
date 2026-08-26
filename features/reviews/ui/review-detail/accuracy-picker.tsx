"use client";

import { cn } from "@/shared/lib/utils";
import type { ReviewAccuracyChoice } from "../../types";

const ACCURACY_OPTIONS: {
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
  onChange: (value: ReviewAccuracyChoice) => void;
};

const AccuracyPicker = ({ value, onChange }: AccuracyPickerProps) => {
  return (
    <div
      className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
      role="radiogroup"
      aria-label="How accurate was your prediction?"
    >
      {ACCURACY_OPTIONS.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "bg-card text-muted-foreground hover:text-foreground min-h-16 rounded-xl px-3 py-4 text-center text-sm leading-snug transition-colors ring-1 ring-foreground/10",
              selected &&
                "bg-foreground/10 text-foreground ring-foreground/30",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default AccuracyPicker;
