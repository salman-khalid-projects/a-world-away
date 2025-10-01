// Core data types for the exoplanet analysis app

export interface LightCurveData {
  t: number;
  flux: number;
}

export interface PhaseFoldedData {
  phase: number;
  flux: number;
}

export interface PeriodogramData {
  period: number;
  power: number;
}

export interface FeatureImportance {
  name: string;
  value: number;
}

export interface AnalysisVerdict {
  label: string;
  confidence: number;
  period: number;
  depthPpm: number;
  durationHr: number;
}

export interface TargetInfo {
  id: string;
  mission: "TESS" | "Kepler" | "K2";
  magnitude: number;
  period?: number;
  status: "Candidate" | "Confirmed" | "False Positive";
}

export interface TabConfig {
  id: string;
  label: string;
}

export type StatTone = "default" | "good" | "warn" | "bad";

export interface StatProps {
  label: string;
  value: string;
  hint?: string;
  tone?: StatTone;
  className?: string;
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export interface ChipProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export interface SectionTitleProps {
  title: string;
  caption?: string;
  className?: string;
}
