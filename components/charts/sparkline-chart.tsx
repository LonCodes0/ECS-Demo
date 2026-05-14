"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

import { ChartShell } from "@/components/charts/chart-shell";

export function SparklineChart({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  const chartData = data.map((value, index: number) => ({ index, value }));

  return (
    <ChartShell height={52}>
      <ResponsiveContainer width="100%" height={52}>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}
