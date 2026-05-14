"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartShell } from "@/components/charts/chart-shell";
import type { AnalyticsPoint } from "@/lib/ecs-types";

export function AnalyticsChart({ data }: { data: AnalyticsPoint[] }) {
  return (
    <ChartShell height={320}>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(15,52,37,0.06)" vertical={false} />
          <XAxis axisLine={false} tickLine={false} dataKey="label" tick={{ fill: "#778277", fontSize: 11 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#778277", fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              borderRadius: 18,
              border: "1px solid rgba(24,56,39,0.1)",
              background: "rgba(255,255,255,0.96)",
            }}
          />
          <Line type="monotone" dataKey="water" stroke="#2f91d4" strokeWidth={2.1} dot={false} />
          <Line type="monotone" dataKey="energy" stroke="#42b96f" strokeWidth={2.1} dot={false} />
          <Line type="monotone" dataKey="waste" stroke="#f39c39" strokeWidth={2.1} dot={false} />
          <Line type="monotone" dataKey="emissions" stroke="#7b60d1" strokeWidth={2.1} dot={false} />
          <Line type="monotone" dataKey="vegetation" stroke="#3abf9d" strokeWidth={2.1} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}
