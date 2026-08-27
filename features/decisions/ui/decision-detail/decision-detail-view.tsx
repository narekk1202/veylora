import PreviousPageButton from "@/shared/components/previous-page-button";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDecision } from "../../queries";
import { toLines } from "../../utils";
import ConsideredOptionsSection from "./considered-options-section";
import DecisionCardSection from "./decision-card-section";
import DecisionDetailSidebar from "./decision-detail-sidebar";
import DecisionHeader from "./decision-header";
import PostHocNotesSection from "./post-hoc-notes-section";
import ReasoningSection from "./reasoning-section";

export default async function DecisionDetailView({ id }: { id: string }) {
  const decision = await getDecision(id);

  if (!decision) notFound();

  const assumptions = toLines(decision.assumptions);

  return (
    <main className="page_view">
      <div className="flex items-center justify-between gap-3">
        <PreviousPageButton />
        {decision.review ? (
          <Link
            href={`/reviews/${decision.review.id}`}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            View review
            <ArrowRightIcon className="size-4" />
          </Link>
        ) : null}
      </div>
      <DecisionHeader decision={decision} />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="space-y-10">
          <DecisionCardSection label="The situation">
            <p className="leading-6">{decision.context}</p>
          </DecisionCardSection>

          <ConsideredOptionsSection options={decision.options} />

          <ReasoningSection
            primaryReasons={decision.primaryReasons}
            potentialConcerns={decision.potentialConcerns}
            assumptions={assumptions}
          />

          <DecisionCardSection label="The prediction">
            <blockquote className="text-primary/85 font-serif text-lg leading-8 italic">
              “{decision.predictions}”
            </blockquote>
          </DecisionCardSection>

          <PostHocNotesSection
            decisionId={decision.id}
            initialNotes={decision.postHocNotes ?? ""}
          />
        </section>

        <DecisionDetailSidebar decision={decision} />
      </div>
    </main>
  );
}
