"use client";

import { ChartContainer, type ChartConfig } from "@/shared/components/ui/chart";
import { Line, LineChart } from "recharts";

const chartData = [
  { month: "Jan", confidence: 59 },
  { month: "Feb", confidence: 62 },
  { month: "Mar", confidence: 65 },
  { month: "Apr", confidence: 68 },
  { month: "May", confidence: 71 },
];

const chartConfig = {
  confidence: {
    label: "Confidence",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const TrendSparkline = () => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-12 w-32"
      initialDimension={{ width: 128, height: 48 }}
    >
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
      >
        <Line
          dataKey="confidence"
          type="natural"
          stroke="var(--color-confidence)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default TrendSparkline;
