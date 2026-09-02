"use client";

import { ChartContainer, type ChartConfig } from "@/shared/components/ui/chart";
import { Line, LineChart } from "recharts";
import type { TrendPoint } from "../types";

const chartConfig = {
  confidence: {
    label: "Confidence",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type TrendSparklineProps = {
  data: TrendPoint[];
};

const TrendSparkline = ({ data }: TrendSparklineProps) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-12 w-32"
      initialDimension={{ width: 128, height: 48 }}
    >
      <LineChart
        accessibilityLayer
        data={data}
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
