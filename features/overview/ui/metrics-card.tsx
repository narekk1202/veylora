import { buttonVariants } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import type { OverviewMetrics } from "../types";
import AccuracyChart from "./accuracy-chart";
import CategoryBars from "./category-bars";

type MetricsCardProps = {
  metrics: OverviewMetrics;
};

const MetricsCard = ({ metrics }: MetricsCardProps) => {
  const hasTrend = metrics.trend.some((point) => point.accuracy !== null);

  return (
    <Card className="h-full [--card-spacing:--spacing(6)]">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="grid grid-cols-2">
          <MetricStat value={String(metrics.decisions)} label="Decisions" />
          <MetricStat
            value={String(metrics.reviewed)}
            label="Reviewed"
            className="border-l"
          />
          <MetricStat
            value={`${metrics.avgConfidence}%`}
            label="Avg. Confidence"
            className="border-t"
          />
          <MetricStat
            value={metrics.accuracy === null ? "—" : `${metrics.accuracy}%`}
            label="Accuracy"
            className="border-t border-l"
            valueClassName={
              metrics.accuracy === null ? undefined : "text-chart-3"
            }
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium">Accuracy over time</p>
            <p className="text-muted-foreground text-[10px] tracking-wider uppercase">
              Last 6 months
            </p>
          </div>
          {hasTrend ? (
            <AccuracyChart data={metrics.trend} />
          ) : (
            <p className="text-muted-foreground py-6 text-center text-xs">
              Complete a review to see accuracy over time.
            </p>
          )}
        </div>

        {metrics.categories.length > 0 ? (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium">Decisions by category</p>
            <CategoryBars categories={metrics.categories} />
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="border-t-0 bg-transparent">
        <Link
          href="/insights"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-9 w-full text-xs",
          )}
        >
          Full Insight Report
        </Link>
      </CardFooter>
    </Card>
  );
};

const MetricStat = ({
  value,
  label,
  className,
  valueClassName,
}: {
  value: string;
  label: string;
  className?: string;
  valueClassName?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-1 px-3 py-3", className)}>
      <p
        className={cn("font-serif text-2xl font-normal italic", valueClassName)}
      >
        {value}
      </p>
      <p className="text-muted-foreground text-[10px] tracking-wider uppercase">
        {label}
      </p>
    </div>
  );
};

export default MetricsCard;
