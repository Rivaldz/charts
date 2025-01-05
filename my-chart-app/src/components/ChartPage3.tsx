/* eslint-disable */
"use client";

import { TrendingUp } from "lucide-react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  Rectangle
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
  total_revenue_expense: {
    label: "Comulative Cashflow",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig;

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000"];

export default function ChartPage({ chartData }) {
  return (
    <Card style={{ width: '100%' }}>
      <CardHeader>
        <CardTitle>Line Chart - Revenue and Expense</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis domain={["auto", "auto"]} allowDataOverflow />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              type="monotone"
              dataKey="comulative"
              stroke="#8884d8" // Warna garis
              strokeWidth={2}
              dot={{ stroke: '#8884d8', strokeWidth: 2 }} // Gaya titik
              activeDot={{ r: 8 }} // Titik aktif
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  );
}
