import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import type { TimelineCalibration, TimelineStatus } from "../types";
import TimelineEstimate from "./timeline-estimate";

const STATUS_STYLES: Record<
  TimelineStatus,
  { statusClassName: string; indicatorClassName: string }
> = {
  late: {
    statusClassName: "text-destructive",
    indicatorClassName: "[&_[data-slot=progress-indicator]]:bg-destructive/70",
  },
  on_time: {
    statusClassName: "text-chart-3",
    indicatorClassName: "[&_[data-slot=progress-indicator]]:bg-chart-3/70",
  },
  early: {
    statusClassName: "text-chart-3",
    indicatorClassName: "[&_[data-slot=progress-indicator]]:bg-chart-3/70",
  },
};

function dayLabel(days: number) {
  return days === 1 ? "Day" : "Days";
}

type TimelineCalibrationCardProps = {
  timeline: TimelineCalibration;
};

const TimelineCalibrationCard = ({
  timeline,
}: TimelineCalibrationCardProps) => {
  return (
    <Card className="[--card-spacing:--spacing(8)]">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Timeline Calibration
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center gap-6">
          {timeline.estimates.map((estimate) => {
            const styles = STATUS_STYLES[estimate.status];

            return (
              <TimelineEstimate
                key={`${estimate.title}-${estimate.expectedDays}-${estimate.actualDays}`}
                title={estimate.title}
                statusLabel={estimate.statusLabel}
                statusClassName={styles.statusClassName}
                expectedLabel={`Exp: ${estimate.expectedDays} ${dayLabel(estimate.expectedDays)}`}
                actualLabel={`Act: ${estimate.actualDays} ${dayLabel(estimate.actualDays)}`}
                progress={estimate.progress}
                indicatorClassName={styles.indicatorClassName}
              />
            );
          })}
        </div>
        <div className="flex flex-col justify-center lg:border-l lg:pl-16">
          <Separator className="mb-8 lg:hidden" />
          <div className="max-w-xs">
            <h4 className="mb-3 font-serif text-lg italic">
              {timeline.biasTitle}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {timeline.lead}
              {timeline.highlight ? (
                <span className="text-foreground font-medium">
                  {timeline.highlight}
                </span>
              ) : null}
              {timeline.follow}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineCalibrationCard;
