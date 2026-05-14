"use client";

import { useScenarioData } from "@/components/providers/scenario-provider";
import { AnalyticsChart } from "@/components/charts/analytics-chart";
import { PageHeader } from "@/components/shared/page-header";
import { ScenarioHero } from "@/components/shared/scenario-hero";
import { Card, CardTitle } from "@/components/ui/card";
import type { CityComparison } from "@/lib/ecs-types";

export function AnalyticsView() {
  const { data } = useScenarioData();

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Performance Analytics"
        title="Cross-variable trend analysis"
        description="An expanded comparison page for judges who want to see how environmental variables move together instead of viewing them one card at a time."
      />
      <ScenarioHero />
      <Card>
        <CardTitle>Comparative trend layers</CardTitle>
        <p className="mt-1 text-sm text-slate-500">
          Relative signal changes across water, energy, waste, emissions, and vegetation
        </p>
        <div className="mt-4">
          <AnalyticsChart data={data.analytics} />
        </div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-3">
        {data.cityComparisons.map((city: CityComparison) => (
          <Card key={city.name}>
            <CardTitle>{city.name}</CardTitle>
            <div className="mt-4 text-[2.4rem] font-semibold tracking-[-0.05em] text-slate-950">
              {city.score.toFixed(1)}
            </div>
            <div className="mt-1 text-sm text-slate-500">{city.delta}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
