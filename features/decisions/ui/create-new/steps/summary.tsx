import { useCreateDecision } from "@/features/decisions/hooks/use-create-decision";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import StepsFooter from "../steps-footer";
import StepsHeading from "../steps-heading";
const sectionLabelClassName =
  "text-muted-foreground text-[10px] font-medium tracking-wider uppercase";

const SummaryStep = () => {
  const { form, onSubmit, isPending } = useCreateDecision();

  return (
    <section className="flex flex-col gap-8">
      <StepsHeading
        title="Review your decision."
        description="This is your summary — everything you captured across the previous steps. Read it once more with fresh eyes, then lock it when you're ready."
      />

      <div className="flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h3 className={sectionLabelClassName}>The decision</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary font-serif text-2xl font-medium">
                {form.getValues("question")}
              </CardTitle>
              <CardDescription>{form.getValues("context")}</CardDescription>
            </CardHeader>
          </Card>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="flex flex-col gap-2">
            <h3 className={sectionLabelClassName}>Considered options</h3>
            <ul className="flex flex-col gap-2">
              {form.getValues("options").map((option) => (
                <li key={option.id}>
                  <Card
                    size="sm"
                    aria-current={
                      option.id === form.getValues("selectedOptionId")
                        ? "true"
                        : undefined
                    }
                    className={cn(
                      "py-3",
                      option.id === form.getValues("selectedOptionId") &&
                        "ring-primary ring-2",
                    )}
                  >
                    <CardContent>
                      <p className="text-sm font-medium">{option.label}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className={sectionLabelClassName}>Prediction target</h3>
            <Card className="h-full">
              <CardContent className="flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-1">
                  <p className={sectionLabelClassName}>Confidence</p>
                  <p className="text-chart-4 font-serif text-4xl tabular-nums">
                    {form.getValues("confidence")}%
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className={sectionLabelClassName}>Review date</p>
                  <p className="text-sm font-medium">
                    {form.getValues("reviewDate").toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <section className="flex flex-col gap-2">
          <h3 className={sectionLabelClassName}>My reasoning</h3>
          <Card>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {form.getValues("primaryReasons")}
              </p>
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="flex flex-col gap-2">
            <h3 className={sectionLabelClassName}>Key assumptions</h3>
            <Card className="h-full">
              <CardContent>
                <ul className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed">
                  {form
                    .getValues("assumptions")
                    .split("\n")
                    .map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-2">
            <h3 className={sectionLabelClassName}>Biggest risks</h3>
            <Card className="h-full">
              <CardContent>
                <ul className="text-muted-foreground flex flex-col gap-3 text-sm leading-relaxed">
                  {form
                    .getValues("potentialConcerns")
                    .split("\n")
                    .map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      <p className="text-muted-foreground/60 text-xs italic">
        Veylora tip: Locking freezes this record. Later reviews compare outcomes
        to this snapshot — not a rewritten story.
      </p>

      <StepsFooter
        isLockStep
        callTrigger={form.trigger}
        onLock={() => onSubmit(form.getValues())}
        isLoading={isPending}
        fields={["primaryReasons", "assumptions", "potentialConcerns"]}
      />
    </section>
  );
};

export default SummaryStep;
