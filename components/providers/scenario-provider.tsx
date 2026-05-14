"use client";

import { createContext, useContext, useState } from "react";

import {
  dashboardDataProvider,
  type DashboardDataProvider,
} from "@/lib/ecs-provider";
import type { DashboardScenarioBundle, ScenarioState } from "@/lib/ecs-types";

type ScenarioContextValue = {
  scenario: ScenarioState;
  setScenario: (scenario: ScenarioState) => void;
  data: DashboardScenarioBundle;
  provider: DashboardDataProvider;
};

const ScenarioContext = createContext<ScenarioContextValue | null>(null);

export function ScenarioProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [scenario, setScenario] = useState<ScenarioState>("stable");
  const data = dashboardDataProvider.getScenarioBundle(scenario);

  return (
    <ScenarioContext.Provider
      value={{
        scenario,
        setScenario,
        data,
        provider: dashboardDataProvider,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenarioData() {
  const context = useContext(ScenarioContext);

  if (!context) {
    throw new Error("useScenarioData must be used within ScenarioProvider.");
  }

  return context;
}
