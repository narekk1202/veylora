import EmptyDecisionsCard from "./empty-decisions-card";
import PlaceholderPanel from "./placeholder-panel";

type OverviewViewProps = {
  firstName: string;
};

const OverviewView = ({ firstName }: OverviewViewProps) => {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-2 py-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-medium max-sm:text-3xl">
          Welcome, {firstName}.
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Your decision journal is empty. Start by recording what you&apos;re
          facing right now.
        </p>
      </div>

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
    </div>
  );
};

export default OverviewView;
