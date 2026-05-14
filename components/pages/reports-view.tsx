"use client";

import { useState } from "react";

import { useScenarioData } from "@/components/providers/scenario-provider";
import { PageHeader } from "@/components/shared/page-header";
import { ScenarioHero } from "@/components/shared/scenario-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import type { ReportSummary } from "@/lib/ecs-types";
import { cn } from "@/lib/utils";

export function ReportsView() {
  const { data } = useScenarioData();
  const [activeReport, setActiveReport] = useState(data.reports[0]?.id ?? "summary");
  const report =
    data.reports.find((item: ReportSummary) => item.id === activeReport) ?? data.reports[0];

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Mock Reports"
        title="Generated report summaries"
        description="Minimal but functional report cards that help judges imagine how ECS outputs could be packaged for environmental review and decision support."
      />
      <ScenarioHero />
      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardTitle>Available report views</CardTitle>
          <div className="mt-4 space-y-3">
            {data.reports.map((item: ReportSummary) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveReport(item.id)}
                className={cn(
                  "w-full rounded-[1.5rem] border px-4 py-4 text-left transition-all duration-300 hover:-translate-y-[1px]",
                  item.id === activeReport
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium text-slate-950">{item.title}</div>
                    <div className="mt-1 text-sm text-slate-500">{item.generatedAt}</div>
                  </div>
                  <Badge tone={item.status === "Ready" ? "good" : "info"}>{item.status}</Badge>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>{report.title}</CardTitle>
            <Button size="sm">Download mock PDF</Button>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{report.summary}</p>
          <div className="mt-5 space-y-3">
            {report.highlights.map((highlight: string) => (
              <div key={highlight} className="rounded-[1.4rem] bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {highlight}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
