"use client";

import { useScenarioData } from "@/components/providers/scenario-provider";
import { Badge } from "@/components/ui/badge";

export function ScenarioHero() {
  const { data, scenario } = useScenarioData();

  const tone =
    scenario === "stable" ? "good" : scenario === "warning" ? "moderate" : "critical";

  return (
    <div className="mb-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="glass-panel rounded-[2rem] border border-white/45 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-emerald-700/65">
              Active Scenario
            </div>
            <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              {data.scenarioLabel}
            </div>
            <p className="mt-2 max-w-[64ch] text-sm leading-6 text-slate-600">
              {data.narrative.description}
            </p>
          </div>
          <Badge tone={tone}>{data.scenarioLabel}</Badge>
        </div>
      </div>
      <div className="glass-panel rounded-[2rem] border border-white/45 p-5">
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-emerald-700/65">
          Presenter Cue
        </div>
        <div className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950">
          {data.narrative.headline}
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Switch scenarios from the top bar to show how alerts, forecasts, and ECS score respond.
        </p>
      </div>
    </div>
  );
}
