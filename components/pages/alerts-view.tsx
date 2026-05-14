"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { useScenarioData } from "@/components/providers/scenario-provider";
import { PageHeader } from "@/components/shared/page-header";
import { ScenarioHero } from "@/components/shared/scenario-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import type { AlertItem } from "@/lib/ecs-types";
import { cn } from "@/lib/utils";

const filters = ["all", "positive", "warning", "critical"] as const;

export function AlertsView() {
  const { data } = useScenarioData();
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");

  const alerts: AlertItem[] =
    filter === "all"
      ? data.alerts
      : data.alerts.filter((alert: AlertItem) => alert.severity === filter);

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Alert Center"
        title="Environmental alerts and events"
        description="A focused judge-friendly page for incident awareness, positive signals, and predicted score-risk events generated from the active scenario."
      />
      <ScenarioHero />
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <CardTitle>Alert stream</CardTitle>
            <p className="mt-1 text-sm text-slate-500">Filter by severity to demonstrate scenario responsiveness</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm capitalize transition-all duration-300",
                  filter === item
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {alerts.map((alert: AlertItem) => (
            <div
              key={alert.id}
              className={cn(
                "rounded-[1.5rem] border px-4 py-4",
                alert.severity === "critical"
                  ? "border-rose-100 bg-rose-50"
                  : alert.severity === "warning"
                    ? "border-amber-100 bg-amber-50"
                    : "border-emerald-100 bg-emerald-50",
              )}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    {alert.severity === "critical" ? (
                      <ArrowDownRight className="h-5 w-5 text-rose-600" strokeWidth={1.8} />
                    ) : (
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5",
                          alert.severity === "warning" ? "text-amber-600" : "text-emerald-600",
                        )}
                        strokeWidth={1.8}
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-950">{alert.title}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-600">{alert.message}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                      {alert.timestamp}
                    </div>
                  </div>
                </div>
                <Badge
                  tone={
                    alert.severity === "critical"
                      ? "critical"
                      : alert.severity === "warning"
                        ? "moderate"
                        : "good"
                  }
                >
                  {alert.severity}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
