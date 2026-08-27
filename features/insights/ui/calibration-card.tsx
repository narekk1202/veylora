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
import CalibrationChart from "./calibration-chart";

const CalibrationCard = () => {
  return (
    <Card className="h-full [--card-spacing:--spacing(8)]">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          Calibration
        </CardTitle>
        <CardDescription>Accuracy vs. Stated Confidence</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-12">
        <CalibrationChart />
        <Alert>
          <InfoIcon />
          <AlertTitle>Under-confidence pattern:</AlertTitle>
          <AlertDescription>
            In high-stakes decisions, your actual accuracy is 15% higher than
            your stated confidence suggests.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default CalibrationCard;
