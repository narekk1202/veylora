import { Progress } from "@/shared/components/ui/progress";
import { cn } from "@/shared/lib/utils";

type TimelineEstimateProps = {
  title: string;
  statusLabel: string;
  statusClassName: string;
  expectedLabel: string;
  actualLabel: string;
  progress: number;
  indicatorClassName: string;
};

const TimelineEstimate = ({
  title,
  statusLabel,
  statusClassName,
  expectedLabel,
  actualLabel,
  progress,
  indicatorClassName,
}: TimelineEstimateProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-between gap-3">
        <span className="text-xs font-medium">{title}</span>
        <span
          className={cn("text-[10px] font-bold uppercase", statusClassName)}
        >
          {statusLabel}
        </span>
      </div>
      <Progress
        value={progress}
        aria-label={`${title} ${actualLabel}`}
        className={cn(
          "w-full **:data-[slot=progress-track]:h-2",
          indicatorClassName,
        )}
      />
      <div className="text-muted-foreground flex justify-between text-[10px] tracking-wide uppercase">
        <span>{expectedLabel}</span>
        <span>{actualLabel}</span>
      </div>
    </div>
  );
};

export default TimelineEstimate;
