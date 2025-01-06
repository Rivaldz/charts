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
  Rectangle,
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
    label: "Comulative Net Cashflow",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000"];

export default function ChartPage({ chartData }) {
  return (
    <Card style={{ width: "100%" }}>
      <CardHeader>
        <CardTitle>Line Chart - Revenue and Expense</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 50, bottom: 5 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              domain={["auto", "auto"]}
              allowDataOverflow
              tickFormatter={(value) => {
                return new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                }).format(value);
              }}
            />

            <ChartTooltip
              content={({ payload, label }) => {
                if (!payload || payload.length === 0) return null;

                return (
                  <div className="p-2 bg-white border rounded shadow-md text-sm">
                    <p className="font-bold mb-1">{label}</p>
                    {payload.map((entry, index) => (
                      <div
                        key={`item-${index}`}
                        className="flex items-center gap-2"
                      >
                        {/* Warna Indikator */}
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        ></span>
                        {/* Label dan Value */}
                        <span>Comulative Net Cashflow: </span>
                        <span className="font-medium ml-1">$
                          {entry.value.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="comulative"
              stroke="#8884d8" // Warna garis
              strokeWidth={2}
              dot={{ stroke: "#8884d8", strokeWidth: 2 }} // Gaya titik
              activeDot={{ r: 8 }} // Titik aktif
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
