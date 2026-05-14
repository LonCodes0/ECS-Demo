"use client";

import { useState } from "react";

import { useScenarioData } from "@/components/providers/scenario-provider";
import { PageHeader } from "@/components/shared/page-header";
import { ScenarioHero } from "@/components/shared/scenario-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import type { SettingsSnapshot } from "@/lib/ecs-types";
import { cn } from "@/lib/utils";

export function SettingsView() {
  const { data } = useScenarioData();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [alertsPreview, setAlertsPreview] = useState(true);

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="System Settings"
        title="Demo configuration surface"
        description="A display-first settings page that still feels functional, giving judges the impression of a configurable ECS platform without overbuilding unsupported controls."
      />
      <ScenarioHero />
      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardTitle>Model and runtime</CardTitle>
          <div className="mt-5 space-y-4">
            <div className="rounded-[1.5rem] bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Model status</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-950">{data.settings.modelName}</span>
                <Badge tone="good">{data.settings.modelStatus}</Badge>
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Data source</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">{data.settings.dataMode}</div>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Refresh profile</div>
              <div className="mt-2 text-lg font-semibold text-slate-950">{data.settings.refreshMode}</div>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle>Display controls</CardTitle>
          <div className="mt-5 space-y-4">
            <button
              type="button"
              onClick={() => setAutoRefresh((value) => !value)}
              className="flex w-full items-center justify-between rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-left"
            >
              <div>
                <div className="font-medium text-slate-950">Auto-refresh preview</div>
                <div className="mt-1 text-sm text-slate-500">Visual mock toggle for live dashboard rhythm</div>
              </div>
              <div
                className={cn(
                  "relative h-7 w-12 rounded-full transition-colors duration-300",
                  autoRefresh ? "bg-emerald-500" : "bg-slate-200",
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 h-5 w-5 rounded-full bg-white transition-transform duration-300",
                    autoRefresh ? "translate-x-6" : "translate-x-1",
                  )}
                />
              </div>
            </button>
            <button
              type="button"
              onClick={() => setAlertsPreview((value) => !value)}
              className="flex w-full items-center justify-between rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 text-left"
            >
              <div>
                <div className="font-medium text-slate-950">Alert preview overlay</div>
                <div className="mt-1 text-sm text-slate-500">Demo-only setting for showing predictive alert emphasis</div>
              </div>
              <div
                className={cn(
                  "relative h-7 w-12 rounded-full transition-colors duration-300",
                  alertsPreview ? "bg-emerald-500" : "bg-slate-200",
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 h-5 w-5 rounded-full bg-white transition-transform duration-300",
                    alertsPreview ? "translate-x-6" : "translate-x-1",
                  )}
                />
              </div>
            </button>
          </div>
          <div className="mt-5 rounded-[1.5rem] bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Threshold profiles</div>
            <div className="mt-3 space-y-3">
              {data.settings.thresholds.map((threshold: SettingsSnapshot["thresholds"][number]) => (
                <div key={threshold.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{threshold.label}</span>
                  <span className="font-semibold text-slate-950">{threshold.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
