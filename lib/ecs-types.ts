export type ScenarioState = "stable" | "warning" | "critical";

export type VariableKey = "water" | "energy" | "waste" | "emissions" | "vegetation";

export type StatusTone = "good" | "moderate" | "high";
export type SolutionCategory = "waste" | "energy" | "water";
export type SolutionStatus = "active" | "partner" | "new";

export interface EnvironmentalScoreSnapshot {
  score: number;
  grade: string;
  summary: string;
  deltaFromYesterday: number;
  trendLabel: string;
  average30d: number;
  best30d: number;
  physicsCompliance: number;
  violations: number;
}

export interface ForecastPoint {
  label: string;
  historical: number | null;
  forecast: number | null;
  lower: number | null;
  upper: number | null;
}

export interface VariableMetric {
  id: VariableKey;
  name: string;
  displayValue: string;
  unit: string;
  statusLabel: string;
  statusTone: StatusTone;
  impact: number;
  sparkline: number[];
  weight: number;
  description: string;
}

export interface ScoreHistoryPoint {
  label: string;
  score: number;
}

export interface InsightItem {
  id: string;
  title: string;
  detail: string;
}

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  severity: "positive" | "warning" | "critical";
  timestamp: string;
}

export interface BenchmarkMetric {
  label: string;
  value: number;
}

export interface ReportSummary {
  id: string;
  title: string;
  summary: string;
  generatedAt: string;
  status: "Ready" | "Draft";
  highlights: string[];
}

export interface SettingsSnapshot {
  modelName: string;
  modelStatus: string;
  dataMode: string;
  refreshMode: string;
  thresholds: { label: string; value: string }[];
}

export interface AnalyticsPoint {
  label: string;
  water: number;
  energy: number;
  waste: number;
  emissions: number;
  vegetation: number;
}

export interface OverviewStat {
  label: string;
  value: string;
  change: string;
}

export interface CityComparison {
  name: string;
  score: number;
  delta: string;
}

export interface SolutionPartner {
  id: string;
  name: string;
  category: SolutionCategory;
  status: SolutionStatus;
  description: string;
  tags: string[];
  savingPct: number;
  estimatedScoreUplift: number;
  timeToImpactDays: number;
  contactUrl?: string;
}

export interface SolutionRecommendationSummary {
  category: SolutionCategory;
  variableId: VariableKey;
  variableName: string;
  impact: number;
  headline: string;
  description: string;
}

export interface DashboardScenarioBundle {
  scenario: ScenarioState;
  scenarioLabel: string;
  narrative: {
    headline: string;
    description: string;
    forecastCue: string;
  };
  score: EnvironmentalScoreSnapshot;
  forecast: ForecastPoint[];
  variables: VariableMetric[];
  scoreHistory: ScoreHistoryPoint[];
  insights: {
    drivers: InsightItem[];
    recommendations: InsightItem[];
  };
  alerts: AlertItem[];
  benchmarks: BenchmarkMetric[];
  reports: ReportSummary[];
  settings: SettingsSnapshot;
  overviewStats: OverviewStat[];
  analytics: AnalyticsPoint[];
  cityComparisons: CityComparison[];
  solutions: SolutionPartner[];
  solutionRecommendation: SolutionRecommendationSummary;
}

export interface ScenarioOption {
  id: ScenarioState;
  label: string;
  caption: string;
}
