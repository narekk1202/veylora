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

const SUMMARY_PREVIEW = {
  question: "Should I switch to the Lead Product role?",
  context:
    "The company is restructuring product around a new platform bet. I've been asked to move from Senior IC into a Lead role that owns the roadmap, people, and delivery for one squad.",
  options: [
    { id: "stay", label: "Stay as Senior IC" },
    { id: "lead", label: "Accept Lead Product", selected: true },
    { id: "external", label: "Look for external IC Lead roles" },
  ],
  confidence: 75,
  reviewDate: "Sept 15, 2026",
  reasoning:
    "The title bump is real, and the team already looks to me for coordination. I want the salary increase, and I believe I can keep enough craft in the week if I protect maker time. The alternative — staying IC — feels like delaying a conversation that is already happening.",
  assumptions: [
    "The title bump will translate into real decision rights, not just more meetings.",
    "Leadership will keep the squad resourced through the next two quarters.",
  ],
  risks: [
    "Coordination overhead crowds out the craft that currently makes the work sustainable.",
    "If the reorg stalls, the new scope exists on paper only.",
  ],
};

const SummaryStep = () => {
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
                {SUMMARY_PREVIEW.question}
              </CardTitle>
              <CardDescription>{SUMMARY_PREVIEW.context}</CardDescription>
            </CardHeader>
          </Card>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="flex flex-col gap-2">
            <h3 className={sectionLabelClassName}>Considered options</h3>
            <ul className="flex flex-col gap-2">
              {SUMMARY_PREVIEW.options.map((option) => (
                <li key={option.id}>
                  <Card
                    size="sm"
                    aria-current={option.selected ? "true" : undefined}
                    className={cn(
                      "py-3",
                      option.selected && "ring-primary ring-2",
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
                    {SUMMARY_PREVIEW.confidence}%
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className={sectionLabelClassName}>Review date</p>
                  <p className="text-sm font-medium">
                    {SUMMARY_PREVIEW.reviewDate}
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
                {SUMMARY_PREVIEW.reasoning}
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
                  {SUMMARY_PREVIEW.assumptions.map((item) => (
                    <li key={item}>{item}</li>
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
                  {SUMMARY_PREVIEW.risks.map((item) => (
                    <li key={item}>{item}</li>
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

      <StepsFooter isLockStep />
    </section>
  );
};

export default SummaryStep;
