"use client";

import { Activity, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

import { useScenarioData } from "@/components/providers/scenario-provider";
import { ForecastChart } from "@/components/charts/forecast-chart";
import { PageHeader } from "@/components/shared/page-header";
import { ScenarioHero } from "@/components/shared/scenario-hero";
import { Card, CardTitle } from "@/components/ui/card";
import type { OverviewStat } from "@/lib/ecs-types";

const icons = [TrendingUp, ShieldCheck, Activity, Sparkles];

export function OverviewView() {
  const { data } = useScenarioData();

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Operational Summary"
        title="System-wide environmental overview"
        description="A compact executive view for judges to understand the current ECS state before diving into deeper forecast, variable, and alert pages."
      />
      <ScenarioHero />
      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardTitle>Executive signal board</CardTitle>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.overviewStats.map((item: OverviewStat, index: number) => {
              const Icon = icons[index % icons.length];
              return (
                <div key={item.label} className="rounded-[1.6rem] bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{item.label}</span>
                    <Icon className="h-4.5 w-4.5 text-slate-500" strokeWidth={1.8} />
                  </div>
                  <div className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">{item.change}</div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <CardTitle>System narrative</CardTitle>
          <div className="mt-4 rounded-[1.6rem] bg-[linear-gradient(180deg,#f4faf5_0%,#edf6ef_100%)] p-5">
            <div className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
              {data.narrative.headline}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{data.narrative.description}</p>
            <div className="mt-4 rounded-[1.3rem] border border-emerald-100 bg-white/80 p-4 text-sm leading-6 text-slate-600">
              ECS is aggregating water, energy, waste, carbon emissions, and vegetation cover into a unified score while preserving interpretability through structured environmental variables and scenario-based forecasting.
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle>Forecast posture</CardTitle>
        <p className="mt-1 text-sm text-slate-500">
          Overview page keeps the forecast visible for quick presentation context.
        </p>
        <div className="mt-4">
          <ForecastChart data={data.forecast} height={290} />
        </div>
      </Card>
    </div>
  );
}
