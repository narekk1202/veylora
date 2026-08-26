import type { ReactNode } from "react";

type ReviewFormSectionProps = {
  step: number;
  title: string;
  children: ReactNode;
};

const ReviewFormSection = ({
  step,
  title,
  children,
}: ReviewFormSectionProps) => {
  const stepLabel = String(step).padStart(2, "0");

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span
          className="text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-xs font-medium tabular-nums"
          aria-hidden
        >
          {stepLabel}
        </span>
        <h3 className="text-base font-medium sm:text-lg">{title}</h3>
      </div>
      {children}
    </section>
  );
};

export default ReviewFormSection;
