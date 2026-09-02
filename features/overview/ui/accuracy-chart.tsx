"use client";

import { ChartContainer, type ChartConfig } from "@/shared/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import type { AccuracyTrendPoint } from "../types";

const chartConfig = {
  accuracy: {
    label: "Accuracy",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

type AccuracyChartProps = {
  data: AccuracyTrendPoint[];
};

const AccuracyChart = ({ data }: AccuracyChartProps) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-24 w-full"
      initialDimension={{ width: 374, height: 96 }}
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ top: 4, right: 4, bottom: 0, left: 4 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={0}
          padding={{ left: 8, right: 8 }}
          className="text-[9px] font-bold tracking-wider"
        />
        <Line
          dataKey="accuracy"
          type="natural"
          stroke="var(--color-accuracy)"
          strokeWidth={2}
          connectNulls
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default AccuracyChart;
