import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import TimelineEstimate from "./timeline-estimate";

const TimelineCalibrationCard = () => {
  return (
    <Card className="[--card-spacing:--spacing(8)]">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Timeline Calibration
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center gap-6">
          <TimelineEstimate
            title="Project Architecture Switch"
            statusLabel="+9 Days"
            statusClassName="text-destructive"
            expectedLabel="Exp: 14 Days"
            actualLabel="Act: 23 Days"
            progress={85}
            indicatorClassName="[&_[data-slot=progress-indicator]]:bg-destructive/70"
          />
          <TimelineEstimate
            title="Moving City Center"
            statusLabel="On Time"
            statusClassName="text-chart-3"
            expectedLabel="Exp: 30 Days"
            actualLabel="Act: 30 Days"
            progress={70}
            indicatorClassName="[&_[data-slot=progress-indicator]]:bg-chart-3/70"
          />
        </div>
        <div className="flex flex-col justify-center lg:border-l lg:pl-16">
          <Separator className="mb-8 lg:hidden" />
          <div className="max-w-xs">
            <h4 className="mb-3 font-serif text-lg italic">Optimism Bias</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Project-related estimates tend to be consistently optimistic. On
              average, timelines are{" "}
              <span className="text-foreground font-medium">35% longer</span>{" "}
              than initially predicted. Consider adding a buffer to future
              reasoning.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineCalibrationCard;
