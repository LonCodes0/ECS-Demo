"use client";

import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartShell } from "@/components/charts/chart-shell";
import { cn } from "@/lib/utils";
import type { ScoreHistoryPoint } from "@/lib/ecs-types";

const ranges = [
  { id: "7d", label: "7 Days", count: 7 },
  { id: "30d", label: "30 Days", count: 30 },
  { id: "90d", label: "90 Days", count: 18 },
  { id: "1y", label: "1 Year", count: 12 },
] as const;

export function ScoreHistoryChart({ data }: { data: ScoreHistoryPoint[] }) {
  const [rangeId, setRangeId] = useState<(typeof ranges)[number]["id"]>("30d");
  const selected =
    ranges.find((range: (typeof ranges)[number]) => range.id === rangeId) ?? ranges[1];
  const chartData = data.slice(-selected.count);

  return (
    <div className="space-y-4">
      <div className="h-[220px]">
        <ChartShell height={220}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
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
                contentStyle={{
                  borderRadius: 18,
                  border: "1px solid rgba(24,56,39,0.1)",
                  background: "rgba(255,255,255,0.96)",
                  boxShadow: "0 20px 40px -24px rgba(8,24,16,0.18)",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2aa85b"
                strokeWidth={2.8}
                dot={false}
                activeDot={{ r: 4.5, fill: "#2aa85b" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartShell>
      </div>
      <div className="flex flex-wrap gap-2">
        {ranges.map((range) => (
          <button
            key={range.id}
            type="button"
            onClick={() => setRangeId(range.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300",
              rangeId === range.id
                ? "bg-emerald-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
            )}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}
