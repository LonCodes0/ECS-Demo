"use client";

import { useMemo, useState } from "react";
import {
  BadgeDollarSign,
  Droplets,
  ExternalLink,
  Leaf,
  Recycle,
  Sparkles,
  TimerReset,
  Zap,
} from "lucide-react";

import { useScenarioData } from "@/components/providers/scenario-provider";
import { PageHeader } from "@/components/shared/page-header";
import { ScenarioHero } from "@/components/shared/scenario-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import type {
  SolutionCategory,
  SolutionPartner,
  SolutionRecommendationSummary,
} from "@/lib/ecs-types";
import { cn, formatSigned } from "@/lib/utils";

const categories: Array<{
  id: SolutionCategory;
  label: string;
  icon: typeof Recycle;
}> = [
  { id: "waste", label: "Waste", icon: Recycle },
  { id: "energy", label: "Energy", icon: Zap },
  { id: "water", label: "Water", icon: Droplets },
];

const sortModes = [
  { id: "recommended", label: "Recommended" },
  { id: "savings", label: "Highest Savings" },
  { id: "speed", label: "Fastest Impact" },
] as const;

function getStatusTone(status: SolutionPartner["status"]) {
  switch (status) {
    case "active":
      return "good";
    case "partner":
      return "info";
    case "new":
      return "moderate";
    default:
      return "neutral";
  }
}

function getCategoryAccent(category: SolutionCategory) {
  switch (category) {
    case "waste":
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-100",
      };
    case "energy":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-100",
      };
    case "water":
      return {
        bg: "bg-sky-50",
        text: "text-sky-700",
        border: "border-sky-100",
      };
  }
}

function getRecommendationWeight(
  partner: SolutionPartner,
  recommendation: SolutionRecommendationSummary,
) {
  const categoryBoost = partner.category === recommendation.category ? 100 : 0;
  return categoryBoost + partner.estimatedScoreUplift * 5 + partner.savingPct;
}

function SolutionsContent({
  scenarioKey,
}: {
  scenarioKey: string;
}) {
  const { data } = useScenarioData();
  const recommendation = data.solutionRecommendation;

  const [activeCategory, setActiveCategory] = useState<SolutionCategory>(
    recommendation.category,
  );
  const [sortMode, setSortMode] = useState<(typeof sortModes)[number]["id"]>("recommended");
  const [expandedPartnerId, setExpandedPartnerId] = useState<string | null>(null);

  const filteredPartners = useMemo(() => {
    const scoped = data.solutions.filter((partner) => partner.category === activeCategory);

    const sorted = [...scoped].sort((left, right) => {
      if (sortMode === "savings") {
        return right.savingPct - left.savingPct;
      }

      if (sortMode === "speed") {
        return left.timeToImpactDays - right.timeToImpactDays;
      }

      return (
        getRecommendationWeight(right, recommendation) -
        getRecommendationWeight(left, recommendation)
      );
    });

    return sorted;
  }, [activeCategory, data.solutions, recommendation, sortMode]);

  return (
    <div className="space-y-5" data-scenario-key={scenarioKey}>
      <PageHeader
        eyebrow="Actionable Partnerships"
        title="Sustainable Solutions"
        description="ECS now goes beyond monitoring. It highlights the strongest environmental issue, recommends trusted solution partners, and shows the potential score and savings impact of acting on that issue."
      />
      <ScenarioHero />

      <Card className="overflow-hidden">
        <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[1.7rem] border border-emerald-100 bg-[linear-gradient(180deg,#f3faf4_0%,#eef7f0_100%)] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-emerald-700/65">
                  Recommended Focus
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                  {recommendation.headline}
                </div>
              </div>
              <div className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-emerald-700 shadow-[0_10px_24px_-18px_rgba(8,24,16,0.22)]">
                {recommendation.category}
              </div>
            </div>
            <p className="mt-3 max-w-[64ch] text-sm leading-6 text-slate-600">
              {recommendation.description}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] bg-white/85 p-4 shadow-[0_16px_28px_-22px_rgba(8,24,16,0.18)]">
                <div className="text-sm text-slate-500">Weakest variable</div>
                <div className="mt-2 text-lg font-semibold text-slate-950">
                  {recommendation.variableName}
                </div>
              </div>
              <div className="rounded-[1.4rem] bg-white/85 p-4 shadow-[0_16px_28px_-22px_rgba(8,24,16,0.18)]">
                <div className="text-sm text-slate-500">Current score drag</div>
                <div className="mt-2 text-lg font-semibold text-rose-600">
                  {formatSigned(recommendation.impact)}
                </div>
              </div>
              <div className="rounded-[1.4rem] bg-white/85 p-4 shadow-[0_16px_28px_-22px_rgba(8,24,16,0.18)]">
                <div className="text-sm text-slate-500">Delivery mode</div>
                <div className="mt-2 text-lg font-semibold text-slate-950">
                  Curated partner match
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.7rem] border border-slate-200 bg-slate-50/70 p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600" strokeWidth={1.8} />
              <CardTitle>How ECS uses this page</CardTitle>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <div className="rounded-[1.2rem] bg-white px-4 py-3">
                ECS identifies the environmental category with the strongest supported negative impact.
              </div>
              <div className="rounded-[1.2rem] bg-white px-4 py-3">
                The page automatically prioritizes matching solution partners for that category.
              </div>
              <div className="rounded-[1.2rem] bg-white px-4 py-3">
                Users can compare expected ECS score uplift, savings potential, and time to impact before contacting a partner.
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle>Partner marketplace</CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              Saudi-focused mock providers curated around waste, energy, and water improvements
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {sortModes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSortMode(mode.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-all duration-300",
                  sortMode === mode.id
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  setActiveCategory(category.id);
                  setExpandedPartnerId(null);
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm transition-all duration-300",
                  isActive
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                )}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {filteredPartners.map((partner) => {
            const accent = getCategoryAccent(partner.category);
            const expanded = expandedPartnerId === partner.id;

            return (
              <div
                key={partner.id}
                className="rounded-[1.7rem] border border-slate-200 bg-white/95 p-5 shadow-[0_20px_38px_-28px_rgba(8,24,16,0.16)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                      {partner.name}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {partner.description}
                    </p>
                  </div>
                  <Badge tone={getStatusTone(partner.status)}>
                    {partner.status}
                  </Badge>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {partner.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium",
                        accent.bg,
                        accent.text,
                        accent.border,
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.35rem] bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Leaf className="h-4 w-4" strokeWidth={1.8} />
                      <span className="text-xs uppercase tracking-[0.16em]">Score uplift</span>
                    </div>
                    <div className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-emerald-700">
                      +{partner.estimatedScoreUplift.toFixed(1)}
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <BadgeDollarSign className="h-4 w-4" strokeWidth={1.8} />
                      <span className="text-xs uppercase tracking-[0.16em]">Savings</span>
                    </div>
                    <div className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                      {partner.savingPct}%
                    </div>
                  </div>
                  <div className="rounded-[1.35rem] bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <TimerReset className="h-4 w-4" strokeWidth={1.8} />
                      <span className="text-xs uppercase tracking-[0.16em]">Impact window</span>
                    </div>
                    <div className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                      {partner.timeToImpactDays}d
                    </div>
                  </div>
                </div>

                {expanded ? (
                  <div className="mt-4 rounded-[1.4rem] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    This partner is presented as a curated mock integration for the ECS demo. In a future backend-backed implementation, ECS could rank and refresh these providers dynamically using facility type, current variable pressure, and expected return on intervention.
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setExpandedPartnerId((current) =>
                        current === partner.id ? null : partner.id,
                      )
                    }
                  >
                    View Details
                  </Button>
                  <a
                    href={partner.contactUrl ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(180deg,#31ba69_0%,#23914f_100%)] px-4 text-sm font-medium text-white shadow-[0_16px_26px_-16px_rgba(35,145,79,0.75)] transition-all duration-300 hover:-translate-y-[1px] active:translate-y-[1px]"
                  >
                    Contact Partner
                    <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export function SolutionsView() {
  const { scenario, data } = useScenarioData();

  return (
    <SolutionsContent
      key={`${scenario}-${data.solutionRecommendation.category}`}
      scenarioKey={`${scenario}-${data.solutionRecommendation.category}`}
    />
  );
}
