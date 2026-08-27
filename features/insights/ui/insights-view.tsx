import CalibrationCard from "./calibration-card";
import CategoryInsightsCard from "./category-insights-card";
import InsightsHeader from "./insights-header";
import MetricStatCard from "./metric-stat-card";
import TimelineCalibrationCard from "./timeline-calibration-card";
import TrendObservationCard from "./trend-observation-card";

const InsightsView = () => {
  return (
    <main className="page_view gap-12">
      <InsightsHeader />

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <MetricStatCard
            label="Prediction Accuracy"
            value="68%"
            progress={68}
            indicatorClassName="[&_[data-slot=progress-indicator]]:bg-chart-3/60"
          />
        </div>
        <div className="lg:col-span-3">
          <MetricStatCard
            label="Avg. Confidence"
            value="71%"
            progress={71}
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
