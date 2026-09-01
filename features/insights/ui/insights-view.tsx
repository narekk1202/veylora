import PageHeader from "@/shared/components/page-header";
import { getInsights } from "../queries";
import { DecisionsWithReviews } from "../types";
import {
  calculateConfidenceScore,
  calculatePredictionAccuracy,
} from "../utils";
import CalibrationCard from "./calibration-card";
import CategoryInsightsCard from "./category-insights-card";
import MetricStatCard from "./metric-stat-card";
import TimelineCalibrationCard from "./timeline-calibration-card";
import TrendObservationCard from "./trend-observation-card";

const InsightsView = async () => {
  const data = await getInsights();

  const decisionsWithReviews = data.filter(
    (item) => item.review !== null,
  ) as DecisionsWithReviews[];

  const predictionAccuracy = calculatePredictionAccuracy(decisionsWithReviews);
  const confidenceScore = calculateConfidenceScore(decisionsWithReviews);

  return (
    <main className="page_view gap-12">
      <PageHeader
        title="Insights"
        description="Patterns in how you make decisions. Discover where your intuition
        thrives and where your reasoning needs space to grow."
      />
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <MetricStatCard
            label="Prediction Accuracy"
            value={`${predictionAccuracy}%`}
            progress={predictionAccuracy}
            indicatorClassName="[&_[data-slot=progress-indicator]]:bg-chart-3/60"
          />
        </div>
        <div className="lg:col-span-3">
          <MetricStatCard
            label="Avg. Confidence"
            value={`${confidenceScore}%`}
            progress={confidenceScore}
            indicatorClassName="[&_[data-slot=progress-indicator]]:bg-primary/60"
          />
        </div>
        <div className="md:col-span-2 lg:col-span-6">
          <TrendObservationCard />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <CalibrationCard />
        </div>
        <div className="lg:col-span-5">
          <CategoryInsightsCard />
        </div>
      </section>

      <TimelineCalibrationCard />
    </main>
  );
};

export default InsightsView;
