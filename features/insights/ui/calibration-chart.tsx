"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart";
import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from "recharts";
import type { CalibrationPoint } from "../types";

const chartConfig = {
  actual: {
    label: "Actual",
    color: "var(--chart-1)",
  },
  ideal: {
    label: "Ideal",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

type CalibrationChartProps = {
  data: CalibrationPoint[];
};

const CalibrationChart = ({ data }: CalibrationChartProps) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-64 w-full"
      initialDimension={{ width: 520, height: 256 }}
    >
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ top: 8, right: 12, bottom: 16, left: 8 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="confidence"
          type="number"
          domain={[0, 100]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${value}%`}
        >
          <Label
            value="Stated Confidence"
            position="bottom"
            offset={0}
            className="fill-muted-foreground text-[10px] font-bold tracking-widest uppercase"
          />
        </XAxis>
        <YAxis
          type="number"
          domain={[0, 100]}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={48}
          tickFormatter={(value) => `${value}%`}
        >
          <Label
            value="Actual Accuracy"
            angle={-90}
            position="insideLeft"
            offset={10}
            className="fill-muted-foreground text-[10px] font-bold tracking-widest uppercase"
          />
        </YAxis>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="ideal"
          type="linear"
          stroke="var(--color-ideal)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          dot={false}
        />
        <Line
          dataKey="actual"
          type="natural"
          stroke="var(--color-actual)"
          strokeWidth={2}
          connectNulls
          dot={{
            r: 3,
            fill: "var(--background)",
            stroke: "var(--color-actual)",
            strokeWidth: 1,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default CalibrationChart;
