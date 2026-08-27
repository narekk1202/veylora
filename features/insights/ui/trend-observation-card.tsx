import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/shared/components/ui/card";
import TrendSparkline from "./trend-sparkline";

const TrendObservationCard = () => {
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
            Your prediction confidence has increased by{" "}
            <span className="text-foreground font-medium">
              12% over the last 3 months
            </span>
            , matching a slight upward trend in accuracy.
          </p>
        </CardContent>
      </div>
      <div className="mr-(--card-spacing) ml-6 h-12 w-32 shrink-0">
        <TrendSparkline />
      </div>
    </Card>
  );
};

export default TrendObservationCard;
