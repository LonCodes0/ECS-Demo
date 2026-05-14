"use client";

import { useScenarioData } from "@/components/providers/scenario-provider";
import { PageHeader } from "@/components/shared/page-header";
import { ScenarioHero } from "@/components/shared/scenario-hero";
import { Card, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { BenchmarkMetric, CityComparison } from "@/lib/ecs-types";

export function BenchmarksView() {
  const { data } = useScenarioData();

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Benchmarking"
        title="Comparative score benchmarking"
        description="A light benchmark page that gives judges clear score reference points without pretending the mock has a full benchmarking engine behind it."
      />
      <ScenarioHero />
      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardTitle>Benchmark ladder</CardTitle>
          <div className="mt-5 space-y-5">
            {data.benchmarks.map((benchmark: BenchmarkMetric) => (
              <div key={benchmark.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">{benchmark.label}</span>
                  <span className="font-semibold text-slate-950">{benchmark.value.toFixed(1)}</span>
                </div>
                <Progress value={benchmark.value} />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardTitle>Reference note</CardTitle>
          <div className="mt-4 rounded-[1.5rem] bg-slate-50 p-5 text-sm leading-6 text-slate-600">
            In this mock, benchmarks are illustrative comparison anchors designed for judge presentation. They show where the current ECS score sits relative to city average, best observed performance, and a long-term target.
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3 xl:grid-cols-1">
            {data.cityComparisons.map((city: CityComparison) => (
              <div key={city.name} className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                <div className="text-sm text-slate-500">{city.name}</div>
                <div className="mt-3 text-[2rem] font-semibold tracking-[-0.05em] text-slate-950">
                  {city.score.toFixed(1)}
                </div>
                <div className="mt-1 text-sm text-slate-500">{city.delta}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
