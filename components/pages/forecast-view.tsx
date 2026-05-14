"use client";

import { useState } from "react";

import { useScenarioData } from "@/components/providers/scenario-provider";
import { ForecastChart } from "@/components/charts/forecast-chart";
import { PageHeader } from "@/components/shared/page-header";
import { ScenarioHero } from "@/components/shared/scenario-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const outlookCards = [
  { id: "7d", label: "7-Day", detail: "Operational planning window" },
  { id: "14d", label: "14-Day", detail: "Resource allocation window" },
  { id: "30d", label: "30-Day", detail: "Policy readiness window" },
] as const;

export function ForecastView() {
  const { data } = useScenarioData();
  const [activeWindow, setActiveWindow] = useState<(typeof outlookCards)[number]["id"]>("7d");

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Forecast Intelligence"
        title="Projected ECS score behavior"
        description="A dedicated forecast page showing how the environmental score may evolve under the current scenario, including confidence range and likely interpretation for judges."
      />
      <ScenarioHero />

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Forecast horizon</CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Historical baseline, forecast mean, and uncertainty envelope
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {outlookCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveWindow(card.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-all duration-300",
                  activeWindow === card.id
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                )}
              >
                {card.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <ForecastChart data={data.forecast} height={340} />
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        {outlookCards.map((card) => (
          <Card key={card.id} className={cn(activeWindow === card.id && "ring-2 ring-emerald-200")}>
            <div className="flex items-center justify-between">
              <CardTitle>{card.label} outlook</CardTitle>
              <Badge tone={card.id === "30d" ? "info" : "good"}>{card.detail}</Badge>
            </div>
            <div className="mt-4 text-sm leading-6 text-slate-600">
              {card.id === "7d"
                ? data.narrative.forecastCue
                : card.id === "14d"
                  ? "Projected stabilization depends on reducing waste volatility and preserving vegetation momentum."
                  : "Longer-horizon view remains intentionally approximate in this demo and is best used for planning discussion rather than policy commitment."}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
