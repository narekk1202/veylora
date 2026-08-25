import { Card, CardContent } from "@/shared/components/ui/card";
import SectionLabel from "./section-label";

export default function DecisionCardSection({
  label,
  children,
  contentClassName,
}: {
  label: string;
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <section className="space-y-4">
      <SectionLabel>{label}</SectionLabel>
      <Card>
        <CardContent className={contentClassName}>{children}</CardContent>
      </Card>
    </section>
  );
}
