import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { cn } from "@/shared/lib/utils";

type MetricStatCardProps = {
  label: string;
  value: string;
  progress: number;
  indicatorClassName?: string;
};

const MetricStatCard = ({
  label,
  value,
  progress,
  indicatorClassName,
}: MetricStatCardProps) => {
  return (
    <Card className="h-full [--card-spacing:--spacing(6)]">
      <CardHeader>
        <CardDescription className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
          {label}
        </CardDescription>
        <CardTitle className="font-serif text-3xl font-normal italic">
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress
          value={progress}
          aria-label={`${label} ${value}`}
          className={cn("w-full", indicatorClassName)}
        />
      </CardContent>
    </Card>
  );
};

export default MetricStatCard;
