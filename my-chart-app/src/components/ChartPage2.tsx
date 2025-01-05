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
    label: "Total Revenue Expense",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig;
const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000"];
export default function ChartPage({ chartData }) {
  return (
    <Card style={{width:'100%'}}>
      <CardHeader>
        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
         <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <YAxis domain={["auto", "auto"]} allowDataOverflow />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="total_revenue_expense"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              fill="#8884d8" // Default color jika tidak ada warna yang dihasilkan
              shape={({ x, y, width, height, index }) => (
                <Rectangle
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={colors[index % colors.length]} // Warna dari array berdasarkan indeks
                  stroke={colors[index % colors.length]}
                  fillOpacity={0.9}
                />
              )}            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  );
}
