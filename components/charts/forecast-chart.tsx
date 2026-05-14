"use client";

import {
  Area,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartShell } from "@/components/charts/chart-shell";
import type { ForecastPoint } from "@/lib/ecs-types";

export function ForecastChart({
  data,
  height = 280,
}: {
  data: ForecastPoint[];
  height?: number;
}) {
  const chartData = data.map((point) => ({
    ...point,
    uncertaintyBase:
      point.lower === null || point.upper === null ? null : point.lower,
    uncertaintyRange:
      point.lower === null || point.upper === null ? null : point.upper - point.lower,
  }));

  return (
    <ChartShell height={height}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={chartData}>
          <defs>
            <linearGradient id="forecast-band" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78d79d" stopOpacity={0.32} />
              <stop offset="100%" stopColor="#78d79d" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="label"
            tick={{ fill: "#778277", fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[35, 100]}
            tick={{ fill: "#778277", fontSize: 11 }}
          />
          <Tooltip
            cursor={{ stroke: "rgba(42,168,91,0.18)", strokeDasharray: "4 4" }}
            contentStyle={{
              borderRadius: 18,
              border: "1px solid rgba(24,56,39,0.1)",
              background: "rgba(255,255,255,0.96)",
              boxShadow: "0 20px 40px -24px rgba(8,24,16,0.18)",
            }}
          />
          <Area
            type="monotone"
            dataKey="uncertaintyBase"
            stackId="uncertainty"
            stroke="transparent"
            fill="transparent"
            isAnimationActive={false}
            connectNulls
          />
          <Area
            type="monotone"
            dataKey="uncertaintyRange"
            stackId="uncertainty"
            stroke="transparent"
            fill="url(#forecast-band)"
            isAnimationActive={false}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="historical"
            stroke="#2aa85b"
            strokeWidth={2.4}
            dot={false}
            activeDot={{ r: 4, fill: "#2aa85b" }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="#79b98f"
            strokeDasharray="5 5"
            strokeWidth={2.2}
            dot={false}
            activeDot={{ r: 4, fill: "#79b98f" }}
            connectNulls
          />
          <ReferenceLine
            x={chartData.find((point: (typeof chartData)[number]) => point.forecast !== null)?.label}
            stroke="#83b7a3"
            strokeDasharray="5 5"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}
