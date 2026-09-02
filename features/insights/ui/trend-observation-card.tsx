import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/shared/components/ui/card";
import type { TrendObservation } from "../types";
import TrendSparkline from "./trend-sparkline";

type TrendObservationCardProps = {
  trend: TrendObservation;
};

const TrendObservationCard = ({ trend }: TrendObservationCardProps) => {
  return (
    <Card className="h-full flex-row items-center [--card-spacing:--spacing(6)]">
      <div className="min-w-0 flex-1">
        <CardHeader>
          <CardDescription className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            Trend Observation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {trend.lead}
            {trend.highlight ? (
              <span className="text-foreground font-medium">
                {trend.highlight}
              </span>
            ) : null}
            {trend.follow}
          </p>
        </CardContent>
      </div>
      {trend.points.length > 0 ? (
        <div className="mr-(--card-spacing) ml-6 h-12 w-32 shrink-0">
          <TrendSparkline data={trend.points} />
        </div>
      ) : null}
    </Card>
  );
};

export default TrendObservationCard;
