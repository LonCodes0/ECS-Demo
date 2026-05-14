"use client";

import { cn } from "@/lib/utils";
import { useScenarioData } from "@/components/providers/scenario-provider";

export function ScenarioSwitcher() {
  const { scenario, setScenario, provider } = useScenarioData();
  const options = provider.listScenarios();

  return (
    <div className="rounded-[1.5rem] border border-slate-900/8 bg-white/85 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
      <div className="grid grid-cols-3 gap-1">
        {options.map((option) => {
          const isActive = option.id === scenario;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setScenario(option.id)}
              className={cn(
                "rounded-[1rem] px-4 py-2.5 text-left transition-all duration-300 active:translate-y-[1px]",
                isActive
                  ? "bg-[linear-gradient(180deg,#2eb665_0%,#23924f_100%)] text-white shadow-[0_12px_26px_-18px_rgba(35,146,79,0.95)]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <div className="text-sm font-medium">{option.label}</div>
              <div className={cn("text-xs", isActive ? "text-emerald-50/80" : "text-slate-500")}>
                {option.caption}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
