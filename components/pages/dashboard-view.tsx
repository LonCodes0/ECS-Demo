"use client";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Cloud,
  Droplets,
  Leaf,
  Lightbulb,
  Trash2,
  Zap,
} from "lucide-react";

import { useScenarioData } from "@/components/providers/scenario-provider";
import { ForecastChart } from "@/components/charts/forecast-chart";
import { ScoreHistoryChart } from "@/components/charts/score-history-chart";
import { SparklineChart } from "@/components/charts/sparkline-chart";
import { WeightsChart } from "@/components/charts/weights-chart";
import { PageHeader } from "@/components/shared/page-header";
import { ScenarioHero } from "@/components/shared/scenario-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AlertItem, BenchmarkMetric, InsightItem, VariableMetric } from "@/lib/ecs-types";
import { cn, formatSigned } from "@/lib/utils";

const variableIcons = {
  water: Droplets,
  energy: Zap,
  waste: Trash2,
  emissions: Cloud,
  vegetation: Leaf,
} as const;

function ScoreGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 78;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center">
      <svg viewBox="0 0 220 220" className="h-full w-full -rotate-[126deg]">
        <circle
          cx="110"
          cy="110"
          r="78"
          stroke="rgba(15,52,37,0.09)"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="352 490"
        />
        <circle
          cx="110"
          cy="110"
          r="78"
          stroke="url(#scoreGradient)"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset + 138}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#23914f" />
            <stop offset="100%" stopColor="#66d483" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[3.5rem] font-semibold tracking-[-0.08em] text-slate-950">
          {score.toFixed(1)}
        </div>
        <div className="-mt-2 text-sm text-slate-500">/ 100</div>
      </div>
    </div>
  );
}

export function DashboardView() {
  const { data } = useScenarioData();

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Judge Dashboard"
        title="ECS command center"
        description="A polished, scenario-driven mock of the Environmental Card System with score intelligence, forecast behavior, operational context, and explainable environmental metrics."
      />
      <ScenarioHero />

      <div className="grid gap-4 xl:grid-cols-[1.05fr_1.35fr]">
        <Card className="overflow-hidden">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="flex items-center justify-between">
                <CardTitle>Environmental Score</CardTitle>
                <Badge tone="info">Live snapshot</Badge>
              </div>
              <ScoreGauge score={data.score.score} />
              <div className="text-center">
                <div className="text-xl font-semibold tracking-[-0.03em] text-emerald-700">
                  Grade: {data.score.grade}
                </div>
                <div className="mt-1 text-sm text-slate-500">{data.score.summary}</div>
              </div>
            </div>
            <div className="space-y-5 border-t border-slate-200 pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              <div>
                <div className="text-sm text-slate-500">Change from yesterday</div>
                <div className="mt-2 inline-flex items-center gap-2 text-2xl font-semibold text-emerald-700">
                  <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
                  {formatSigned(data.score.deltaFromYesterday)}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Trend</div>
                <div className="mt-2 text-lg font-semibold text-slate-900">{data.score.trendLabel}</div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <div className="text-sm text-slate-500">Average (30 days)</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">
                    {data.score.average30d.toFixed(1)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Best (30 days)</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">
                    {data.score.best30d.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>7-Day Score Forecast</CardTitle>
              <p className="mt-1 text-sm text-slate-500">
                Historical trend, forecast mean, and 90% uncertainty interval
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-6 rounded-full bg-emerald-600" />
                Historical
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-6 rounded-full border border-dashed border-emerald-400" />
                Forecast
              </span>
            </div>
          </div>
          <div className="mt-4">
            <ForecastChart data={data.forecast} />
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-[1.4rem] bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-4.5 w-4.5 shrink-0" strokeWidth={1.8} />
            <span>{data.narrative.forecastCue}</span>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Key Environmental Variables</CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Live variable tiles with contribution trends and score impact
            </p>
          </div>
          <Button size="sm" variant="secondary">
            Explore variable detail
          </Button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {data.variables.map((item: VariableMetric) => {
            const Icon = variableIcons[item.id];
            const tone =
              item.statusTone === "good"
                ? "#2aa85b"
                : item.statusTone === "moderate"
                  ? "#d98c1d"
                  : "#d95e4f";

            return (
              <div key={item.id} className="rounded-[1.7rem] border border-slate-900/6 bg-slate-50/75 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-[0_10px_24px_-18px_rgba(8,24,16,0.22)]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
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
                <div className="mt-4 text-sm font-medium text-slate-700">{item.name}</div>
                <div className="mt-2 flex items-end gap-2">
                  <div className="font-mono text-[2rem] font-semibold tracking-[-0.05em] text-slate-950">
                    {item.displayValue}
                  </div>
                  <div className="pb-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                    {item.unit}
                  </div>
                </div>
                <div className="mt-4">
                  <SparklineChart data={item.sparkline} color={tone} />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Impact on score</span>
                  <span
                    className={cn(
                      "font-semibold",
                      item.impact > 0 ? "text-emerald-700" : "text-rose-600",
                    )}
                  >
                    {formatSigned(item.impact)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.14fr_1fr_0.86fr]">
        <Card>
          <CardTitle>Variable Weights</CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Relative weight of each variable inside the ECS score
          </p>
          <div className="mt-4">
            <WeightsChart data={data.variables} />
          </div>
        </Card>

        <Card>
          <CardTitle>Score History</CardTitle>
          <p className="mt-1 text-sm text-slate-500">Historical score stability across selected time windows</p>
          <div className="mt-4">
            <ScoreHistoryChart data={data.scoreHistory} />
          </div>
        </Card>

        <div className="grid gap-4">
          <Card>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" strokeWidth={1.8} />
              <CardTitle>AI Insights</CardTitle>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <div className="text-sm font-medium text-slate-900">Key drivers</div>
                <div className="mt-2 space-y-2">
                  {data.insights.drivers.map((item: InsightItem) => (
                    <div key={item.id} className="rounded-[1.25rem] bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
                      <div className="font-medium text-slate-900">{item.title}</div>
                      <div className="mt-1">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900">Recommended actions</div>
                <div className="mt-2 space-y-2">
                  {data.insights.recommendations.map((item: InsightItem) => (
                    <div key={item.id} className="rounded-[1.25rem] bg-emerald-50 px-3 py-2.5 text-sm text-emerald-800">
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full">View full report</Button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-600" strokeWidth={1.8} />
              <CardTitle>Physics Consistency</CardTitle>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[1.35rem] bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Compliance</div>
                <div className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-emerald-700">
                  {data.score.physicsCompliance.toFixed(1)}%
                </div>
              </div>
              <div className="rounded-[1.35rem] bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Violations</div>
                <div className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                  {data.score.violations}
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-4">
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
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Recent Alerts</CardTitle>
            <p className="mt-1 text-sm text-slate-500">High-signal events generated from the current scenario state</p>
          </div>
          <Button variant="secondary" size="sm">
            View all alerts
          </Button>
        </div>
        <div className="mt-4 grid gap-3 xl:grid-cols-4">
          {data.alerts.slice(0, 4).map((alert: AlertItem) => (
            <div
              key={alert.id}
              className={cn(
                "rounded-[1.4rem] border px-4 py-3",
                alert.severity === "critical"
                  ? "border-rose-100 bg-rose-50"
                  : alert.severity === "warning"
                    ? "border-amber-100 bg-amber-50"
                    : "border-emerald-100 bg-emerald-50",
              )}
            >
              <div className="flex items-start gap-3">
                {alert.severity === "critical" ? (
                  <ArrowDownRight className="mt-0.5 h-4.5 w-4.5 text-rose-600" strokeWidth={1.8} />
                ) : (
                  <ArrowUpRight
                    className={cn(
                      "mt-0.5 h-4.5 w-4.5",
                      alert.severity === "warning" ? "text-amber-600" : "text-emerald-600",
                    )}
                    strokeWidth={1.8}
                  />
                )}
                <div>
                  <div className="text-sm font-medium text-slate-900">{alert.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{alert.timestamp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
