"use client";

import { Cloud, Droplets, Leaf, Trash2, Zap } from "lucide-react";

import { useScenarioData } from "@/components/providers/scenario-provider";
import { SparklineChart } from "@/components/charts/sparkline-chart";
import { PageHeader } from "@/components/shared/page-header";
import { ScenarioHero } from "@/components/shared/scenario-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import type { VariableMetric } from "@/lib/ecs-types";
import { cn, formatSigned } from "@/lib/utils";

const iconMap = {
  water: Droplets,
  energy: Zap,
  waste: Trash2,
  emissions: Cloud,
  vegetation: Leaf,
} as const;

export function VariablesView() {
  const { data } = useScenarioData();

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Variable Intelligence"
        title="Environmental variable breakdown"
        description="This page isolates the five ECS inputs so judges can see how each variable moves, how much it contributes, and whether it is helping or hurting the environmental score."
      />
      <ScenarioHero />

      <div className="grid gap-4 xl:grid-cols-2">
        {data.variables.map((item: VariableMetric) => {
          const Icon = iconMap[item.id];
          const tone =
            item.statusTone === "good"
              ? "#2aa85b"
              : item.statusTone === "moderate"
                ? "#d98c1d"
                : "#d95e4f";

          return (
            <Card key={item.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-[1.4rem] bg-slate-50 text-slate-700">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <CardTitle>{item.name}</CardTitle>
                    <div className="mt-1 text-sm text-slate-500">{item.description}</div>
                  </div>
                </div>
                <Badge
                  tone={
                    item.statusTone === "good"
                      ? "good"
                      : item.statusTone === "moderate"
                        ? "moderate"
                        : "high"
                  }
                >
                  {item.statusLabel}
                </Badge>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-[1.5rem] bg-slate-50 p-4">
                  <div className="text-sm text-slate-500">Current reading</div>
                  <div className="mt-3 font-mono text-[2.5rem] font-semibold tracking-[-0.06em] text-slate-950">
                    {item.displayValue}
                  </div>
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{item.unit}</div>
                  <div
                    className={cn(
                      "mt-4 text-sm font-semibold",
                      item.impact > 0 ? "text-emerald-700" : "text-rose-600",
                    )}
                  >
                    Impact on score: {formatSigned(item.impact)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Recent movement</div>
                  <div className="mt-4 h-[70px]">
                    <SparklineChart data={item.sparkline} color={tone} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                    <span>Relative weight</span>
                    <span className="font-semibold text-slate-900">{item.weight}%</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
