import { getScenarioData, getScenarioOptions } from "@/lib/ecs-data";
import type {
  DashboardScenarioBundle,
  ScenarioOption,
  ScenarioState,
} from "@/lib/ecs-types";

export interface DashboardDataProvider {
  getScenarioBundle: (scenario: ScenarioState) => DashboardScenarioBundle;
  listScenarios: () => ScenarioOption[];
}

class MockDashboardDataProvider implements DashboardDataProvider {
  getScenarioBundle(scenario: ScenarioState) {
    return getScenarioData(scenario);
  }

  listScenarios() {
    return getScenarioOptions();
  }
}

export const dashboardDataProvider = new MockDashboardDataProvider();
