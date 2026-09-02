import PageHeader from "@/shared/components/page-header";
import { OVERVIEW_QUOTE } from "../consts";
import { getOverview } from "../queries";
import DecisionsAddCard from "./decisions-add-card";
import EmptyDecisionsCard from "./empty-decisions-card";
import MetricsCard from "./metrics-card";
import PlaceholderPanel from "./placeholder-panel";
import RecentDecisionsSection from "./recent-decisions-section";
import UpcomingReviewsSection from "./upcoming-reviews-section";

type OverviewViewProps = {
  firstName: string;
};

const OverviewView = async ({ firstName }: OverviewViewProps) => {
  const overview = await getOverview();
  const isEmpty = overview.metrics.decisions === 0;

  if (isEmpty) {
    return (
      <main className="page_view">
        <PageHeader
          title={`Welcome, ${firstName}.`}
          description="Your decision journal is empty. Start by recording what you're
          facing right now."
        />
        <EmptyDecisionsCard />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <PlaceholderPanel
            title="Upcoming reviews"
            description="Nothing due yet"
          />
          <PlaceholderPanel
            title="Insights"
            description="Unlock after your first review"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="page_view">
      <DecisionsAddCard />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-8">
          <UpcomingReviewsSection reviews={overview.upcomingReviews} />
          <RecentDecisionsSection decisions={overview.recentDecisions} />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-4">
          <MetricsCard metrics={overview.metrics} />
          <p className="text-muted-foreground text-center font-serif text-sm italic">
            &ldquo;{OVERVIEW_QUOTE}&rdquo;
          </p>
        </div>
      </div>
    </main>
  );
};

export default OverviewView;
