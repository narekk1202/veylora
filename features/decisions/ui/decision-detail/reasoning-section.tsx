import { Card, CardContent } from "@/shared/components/ui/card";
import SectionLabel from "./section-label";

export default function ReasoningSection({
  primaryReasons,
  potentialConcerns,
  assumptions,
}: {
  primaryReasons: string;
  potentialConcerns: string;
  assumptions: string[];
}) {
  return (
    <section className="space-y-4">
      <SectionLabel>Reasoning & assumptions</SectionLabel>
      <Card>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="leading-6">{primaryReasons}</p>
          </div>
          <div className="border-t pt-5">
            <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
              Potential concerns
            </p>
            <p className="text-muted-foreground mt-2 leading-6">
              {potentialConcerns}
            </p>
          </div>
          <div className="border-t pt-5">
            <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
              Key assumptions
            </p>
            <ul className="text-muted-foreground mt-3 space-y-1.5 text-sm">
              {assumptions.map((assumption) => (
                <li key={assumption} className="flex gap-2">
                  <span aria-hidden>•</span>
                  <span>{assumption}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
