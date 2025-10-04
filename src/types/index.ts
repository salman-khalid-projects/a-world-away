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

// Exoplanet Classification Types
export type ExoplanetDisposition = "CONFIRMED" | "CANDIDATE" | "FALSE_POSITIVE";

export interface ExoplanetPhysicalData {
  // Core orbital characteristics
  period: number; // Orbital period (days)
  duration: number; // Transit duration (hours)

  // Planetary properties
  prad: number; // Planet radius (Earth radii)

  // Stellar properties
  teff: number; // Stellar effective temperature (K)
  logg: number; // Stellar surface gravity (log g)
  srad: number; // Stellar radius (Solar radii)
  mag: number; // Stellar magnitude (brightness)

  // Derived features (calculated)
  radius_ratio: number; // prad / srad
  orbital_density: number; // prad / period
}

export interface ExoplanetClassification {
  disposition: ExoplanetDisposition;
  confidence: number;
  probabilities: {
    CONFIRMED: number;
    CANDIDATE: number;
    FALSE_POSITIVE: number;
  };
  model_used: "XGBoost" | "Hybrid" | "LSTM";
}

export interface StarData {
  id: string;
  name: string;
  mission: "TESS" | "Kepler" | "K2";
  coordinates: {
    ra: number;
    dec: number;
  };
  physical: ExoplanetPhysicalData;
  classification?: ExoplanetClassification;
  light_curve?: LightCurveData[];
  discovery_date?: string;
  last_updated?: string;
}

export interface ModelPrediction {
  input_data: ExoplanetPhysicalData;
  prediction: ExoplanetClassification;
  feature_importance: FeatureImportance[];
  model_accuracy: number;
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
