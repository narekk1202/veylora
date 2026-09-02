import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { InfoIcon } from "lucide-react";
import type { CalibrationInsight } from "../types";
import CalibrationChart from "./calibration-chart";

type CalibrationCardProps = {
  calibration: CalibrationInsight;
};

const CalibrationCard = ({ calibration }: CalibrationCardProps) => {
  return (
    <Card className="h-full [--card-spacing:--spacing(8)]">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Calibration
        </CardTitle>
        <CardDescription>Accuracy vs. Stated Confidence</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-12">
        <CalibrationChart data={calibration.points} />
        <Alert>
          <InfoIcon />
          <AlertTitle>{calibration.patternTitle}</AlertTitle>
          <AlertDescription>{calibration.patternDescription}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default CalibrationCard;
