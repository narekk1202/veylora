"use client";

import { cn } from "@/shared/lib/utils";
import { Fragment, useEffect, useRef } from "react";
import { newDecision } from "../../libs/stepperize";

const NewDecisionStepper = () => {
  const stepper = newDecision.useStepper();
  const activeStepRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeStepRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [stepper.id]);

  return (
    <nav
      aria-label="Decision creation steps"
      className="-mx-2 w-[calc(100%+1rem)] snap-x snap-mandatory scrollbar-none overflow-x-auto px-2 md:mx-0 md:w-full md:snap-none md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
    >
      <ol className="flex min-w-max items-center md:w-full md:min-w-0">
        {stepper.steps.map((step, index) => {
          const isActive = stepper.id === step.id;

          return (
            <Fragment key={step.id}>
              {index > 0 ? (
                <li
                  aria-hidden
                  className="bg-border/70 mx-2 h-px w-4 shrink-0 self-center md:mx-4 md:w-auto md:min-w-6 md:flex-1"
                />
              ) : null}

              <li className="shrink-0 snap-center">
                <button
                  ref={isActive ? activeStepRef : undefined}
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => stepper.goTo(step.id)}
                  className="group flex flex-col items-start gap-1 px-1 text-left transition-colors md:px-0"
                >
                  <span
                    className={cn(
                      "text-[10px] font-medium tracking-wider uppercase md:text-[11px]",
                      isActive
                        ? "text-muted-foreground"
                        : "text-muted-foreground/35 group-hover:text-muted-foreground/55",
                    )}
                  >
                    STEP {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium whitespace-nowrap md:text-sm",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/35 group-hover:text-muted-foreground/55",
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default NewDecisionStepper;
