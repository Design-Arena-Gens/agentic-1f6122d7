export type Domain = "fitness" | "therapy" | "education";

export interface Metric {
  id: string;
  label: string;
  description: string;
  unit?: string;
  direction: "increase" | "decrease" | "stabilize";
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  domain: Domain;
  targetDate: string;
  targetValue?: number;
  baseline?: number;
  metricId: string;
  status: "on_track" | "at_risk" | "off_track" | "completed";
  progress: number;
}

export interface CheckInEntry {
  id: string;
  date: string;
  domain: Domain;
  highlight: string;
  reflection: string;
  score: number;
  mood?: number;
  energy?: number;
  focus?: number;
  goalUpdates: Array<{ goalId: string; progressDelta: number; note: string }>;
  actionItems: string[];
}

export interface ClientProfile {
  id: string;
  name: string;
  avatarColor: string;
  domain: Domain;
  stage: string;
  celebrating: string;
  focusArea: string;
  momentumScore: number;
  supportNeed: "light" | "moderate" | "intensive";
  goals: Goal[];
  checkIns: CheckInEntry[];
}

export interface SnapshotInsight {
  id: string;
  title: string;
  description: string;
  domain: Domain | "all";
  impact: "positive" | "neutral" | "negative";
  metric: string;
}

export interface StrategyTemplate {
  id: string;
  domain: Domain;
  label: string;
  cadence: string;
  touchpoints: string[];
  checkInPrompts: string[];
  measurementIdeas: string[];
}

export interface MetricTile {
  id: string;
  title: string;
  change: number;
  sparkline: number[];
  domain: Domain | "all";
  description: string;
}
