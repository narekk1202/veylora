import BrandingHeader from "@/shared/components/branding-header";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import InfoCard from "./info-card";

const infoCards = [
  {
    index: 1,
    title: "Capture before you decide",
    description:
      "Write the question, options, reasoning, and what you expect to happen.",
  },
  {
    index: 2,
    title: "Lock your record",
    description:
      "Once locked, your original thinking can't be edited — preventing hindsight bias.",
  },
  {
    index: 3,
    title: "Review with honesty",
    description:
      "When the review date arrives, compare prediction to reality and extract lessons.",
  },
];

const OnboardingView = () => {
  return (
    <main className="page_container px-4">
      <BrandingHeader
        title="Learn from your past self."
        description="A decision journal that locks your reasoning before outcomes — so hindsight stays honest."
      />

      <div className="mt-10 flex w-full flex-col items-center gap-3">
        {infoCards.map((item) => (
          <InfoCard key={`${item.index}-${item.title}`} {...item} />
        ))}
      </div>

      <div className="mt-10 flex items-center gap-2 max-sm:flex-col max-sm:items-center">
        <Button variant="default" className="h-13 w-68">
          <Link href="/decisions/new">Record your first decision</Link>
        </Button>
        <Button variant="link">
          <Link href="/decisions/new">Skip to overview</Link>
        </Button>
      </div>
    </main>
  );
};

export default OnboardingView;
