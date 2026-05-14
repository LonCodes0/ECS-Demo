"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { ChartShell } from "@/components/charts/chart-shell";
import type { VariableMetric } from "@/lib/ecs-types";

const colors = ["#42b96f", "#2f91d4", "#f39c39", "#7b60d1", "#3abf9d"];

export function WeightsChart({ data }: { data: VariableMetric[] }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
      <div className="mx-auto h-[250px] w-full max-w-[250px]">
        <ChartShell height={250}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="weight"
                nameKey="name"
                innerRadius={58}
                outerRadius={96}
                paddingAngle={4}
              >
                {data.map((entry, index: number) => (
                  <Cell key={entry.id} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 18,
                  border: "1px solid rgba(24,56,39,0.1)",
                  background: "rgba(255,255,255,0.96)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartShell>
      </div>
      <div className="space-y-2.5">
        {data.map((item, index: number) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-3"
          >
            <div className="flex min-w-0 items-center gap-3 text-sm text-slate-700">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="leading-5 text-slate-700">{item.name}</span>
            </div>
            <span className="shrink-0 font-medium text-slate-900">{item.weight}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
