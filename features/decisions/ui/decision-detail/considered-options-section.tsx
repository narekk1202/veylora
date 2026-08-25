import type { DecisionOption } from "@/shared/generated/prisma/client";
import { Check } from "lucide-react";
import SectionLabel from "./section-label";

export default function ConsideredOptionsSection({
  options,
}: {
  options: DecisionOption[];
}) {
  return (
    <section className="space-y-4">
      <SectionLabel>Considered options</SectionLabel>
      <div className="space-y-2">
        {options.map((option) => (
          <div
            key={option.id}
            className={
              option.isSelected
                ? "border-primary/45 bg-primary/5 flex items-center justify-between gap-4 rounded-lg border px-4 py-3"
                : "border-border flex items-center justify-between gap-4 rounded-lg border px-4 py-3"
            }
          >
            <span
              className={
                option.isSelected
                  ? "text-sm font-medium"
                  : "text-muted-foreground text-sm"
              }
            >
              {option.label}
            </span>
            {option.isSelected ? (
              <span className="bg-primary/15 text-primary inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                <Check className="size-3" />
                Chosen
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
