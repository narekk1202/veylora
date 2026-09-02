import PageHeader from "@/shared/components/page-header";
import { getInsights } from "../queries";
import type { DecisionWithReview } from "../types";
import { buildInsights } from "../utils";
import CalibrationCard from "./calibration-card";
import CategoryInsightsCard from "./category-insights-card";
import EmptyInsights from "./empty-insights";
import MetricStatCard from "./metric-stat-card";
import TimelineCalibrationCard from "./timeline-calibration-card";
import TrendObservationCard from "./trend-observation-card";

const InsightsView = async () => {
  const decisions = await getInsights();

  return (
    <main className="page_view gap-12">
      <PageHeader
        title="Insights"
        description="Patterns in how you make decisions. Discover where your intuition
        thrives and where your reasoning needs space to grow."
      />
      {decisions.length === 0 ? (
        <EmptyInsights />
      ) : (
        <InsightsContent decisions={decisions} />
      )}
    </main>
  );
};

const InsightsContent = ({
  decisions,
}: {
  decisions: DecisionWithReview[];
}) => {
  const insights = buildInsights(decisions);

  return (
    <>
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <MetricStatCard
            label="Prediction Accuracy"
            value={`${insights.predictionAccuracy}%`}
            progress={insights.predictionAccuracy}
            indicatorClassName="[&_[data-slot=progress-indicator]]:bg-chart-3/60"
          />
        </div>
        <div className="lg:col-span-3">
          <MetricStatCard
            label="Avg. Confidence"
            value={`${insights.confidenceScore}%`}
            progress={insights.confidenceScore}
            indicatorClassName="[&_[data-slot=progress-indicator]]:bg-primary/60"
          />
        </div>
        <div className="md:col-span-2 lg:col-span-6">
          <TrendObservationCard trend={insights.trend} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <CalibrationCard calibration={insights.calibration} />
        </div>
        <div className="lg:col-span-5">
          <CategoryInsightsCard insights={insights.categories} />
        </div>
      </section>

      <TimelineCalibrationCard timeline={insights.timeline} />
    </>
  );
};

export default InsightsView;
