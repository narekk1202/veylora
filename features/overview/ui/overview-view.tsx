import PageHeader from "@/shared/components/page-header";
import EmptyDecisionsCard from "./empty-decisions-card";
import PlaceholderPanel from "./placeholder-panel";

type OverviewViewProps = {
  firstName: string;
};

const OverviewView = ({ firstName }: OverviewViewProps) => {
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
};

export default OverviewView;
