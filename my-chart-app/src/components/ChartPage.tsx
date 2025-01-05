/* eslint-disable */
"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
} from "recharts";
import { ProcessKlinikData } from "@/lib/processData";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--chart-2))",
  },
  comulative: {
    label: "Cumulative",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function ChartPage({ chartData }) {
  return (
    <Card style={{width:'100%'}}>
      <CardHeader>
        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart accessibilityLayer data={chartData} stackOffset="sign">
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis domain={["auto", "auto"]} allowDataOverflow />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="revenue"
              stackId="stack"
              fill="var(--color-revenue)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="expense"
              stackId="stack"
              fill="var(--color-expense)"
              animationBegin={500} // Delay animasi berdasarkan indeks
              animationDuration={800} // Durasi animasi setiap bar
              animationEasing="ease-in-out"
              radius={[4, 4, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="comulative"
              stroke="var(--color-comulative)"
              strokeWidth={2}
              dot={true}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  );
}
