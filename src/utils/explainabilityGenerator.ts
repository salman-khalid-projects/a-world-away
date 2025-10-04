import { StarData, FeatureImportance, ExoplanetClassification } from "../types";

/**
 * Generate realistic explainability data based on star classification and physical properties
 */

export interface ExplainabilityData {
  featureImportances: FeatureImportance[];
  sanityChecks: SanityCheck[];
  modelDecisionPath: DecisionNode[];
  confidenceBreakdown: ConfidenceBreakdown;
}

export interface SanityCheck {
  name: string;
  status: "pass" | "fail" | "warning";
  description: string;
  value?: string;
}

export interface DecisionNode {
  feature: string;
  threshold: number;
  actualValue: number;
  decision: "above" | "below";
  impact: "positive" | "negative" | "neutral";
  description: string;
}

export interface ConfidenceBreakdown {
  periodConfidence: number;
  radiusConfidence: number;
  temperatureConfidence: number;
  durationConfidence: number;
  overallConfidence: number;
}

/**
 * Generate feature importance based on star classification
 */
export function generateFeatureImportance(star: StarData): FeatureImportance[] {
  const { physical, classification } = star;
  const { period, prad, teff, duration, srad, logg, mag } = physical;

  // Calculate feature importance based on physical properties and classification
  const features: FeatureImportance[] = [];

  // Period importance (higher for longer periods = more likely confirmed)
  const periodImportance = Math.min(0.4, period / 100); // Scale by period
  features.push({
    name: "Orbital Period",
    value: periodImportance,
  });

  // Radius ratio importance (planet-to-star radius ratio)
  const radiusRatio = prad / srad;
  const radiusImportance = Math.min(0.35, radiusRatio * 0.1);
  features.push({
    name: "Radius Ratio",
    value: radiusImportance,
  });

  // Temperature importance (habitable zone considerations)
  const tempImportance = teff > 5000 && teff < 7000 ? 0.25 : 0.15;
  features.push({
    name: "Stellar Temperature",
    value: tempImportance,
  });

  // Duration importance (transit duration vs period)
  const durationRatio = duration / (period * 24); // Duration as fraction of period
  const durationImportance = durationRatio < 0.1 ? 0.2 : 0.1;
  features.push({
    name: "Transit Duration",
    value: durationImportance,
  });

  // Surface gravity importance
  const loggImportance = logg > 4.0 ? 0.15 : 0.1;
  features.push({
    name: "Surface Gravity",
    value: loggImportance,
  });

  // Magnitude importance (observability)
  const magImportance = mag < 12 ? 0.2 : 0.1;
  features.push({
    name: "Apparent Magnitude",
    value: magImportance,
  });

  // Orbital density importance
  const orbitalDensity = prad / period;
  const densityImportance = orbitalDensity < 0.1 ? 0.18 : 0.08;
  features.push({
    name: "Orbital Density",
    value: densityImportance,
  });

  // Sort by importance (highest first)
  return features.sort((a, b) => b.value - a.value);
}

/**
 * Generate sanity checks based on physical properties
 */
export function generateSanityChecks(star: StarData): SanityCheck[] {
  const { physical } = star;
  const { period, duration, prad, srad, teff, logg } = physical;

  const checks: SanityCheck[] = [];

  // Transit duration vs period check
  const durationRatio = duration / (period * 24);
  const durationCheck: SanityCheck = {
    name: "Transit Duration vs Period",
    status: durationRatio < 0.2 ? "pass" : "warning",
    description: "Transit duration should be < 20% of orbital period",
    value: `${(durationRatio * 100).toFixed(1)}%`,
  };
  checks.push(durationCheck);

  // Radius ratio check
  const radiusRatio = prad / srad;
  const radiusCheck: SanityCheck = {
    name: "Planet-to-Star Radius Ratio",
    status: radiusRatio < 0.5 ? "pass" : radiusRatio < 1.0 ? "warning" : "fail",
    description: "Radius ratio should be < 0.5 for realistic planets",
    value: radiusRatio.toFixed(3),
  };
  checks.push(radiusCheck);

  // Stellar temperature check
  const tempCheck: SanityCheck = {
    name: "Stellar Temperature",
    status: teff > 3000 && teff < 10000 ? "pass" : "warning",
    description: "Temperature should be 3000-10000K for main sequence stars",
    value: `${teff.toFixed(0)}K`,
  };
  checks.push(tempCheck);

  // Surface gravity check
  const loggCheck: SanityCheck = {
    name: "Surface Gravity",
    status: logg > 3.5 && logg < 5.0 ? "pass" : "warning",
    description: "log g should be 3.5-5.0 for main sequence stars",
    value: logg.toFixed(2),
  };
  checks.push(loggCheck);

  // Period check
  const periodCheck: SanityCheck = {
    name: "Orbital Period",
    status: period > 0.5 && period < 1000 ? "pass" : "warning",
    description: "Period should be 0.5-1000 days for detectable planets",
    value: `${period.toFixed(2)} days`,
  };
  checks.push(periodCheck);

  return checks;
}

/**
 * Generate model decision path
 */
export function generateModelDecisionPath(star: StarData): DecisionNode[] {
  const { physical, classification } = star;
  const { period, prad, teff, duration, srad } = physical;

  const decisions: DecisionNode[] = [];

  // Period decision
  decisions.push({
    feature: "Orbital Period",
    threshold: 10.0,
    actualValue: period,
    decision: period > 10 ? "above" : "below",
    impact: period > 10 ? "positive" : "neutral",
    description:
      period > 10
        ? "Long period suggests confirmed planet"
        : "Short period needs more validation",
  });

  // Radius ratio decision
  const radiusRatio = prad / srad;
  decisions.push({
    feature: "Radius Ratio",
    threshold: 0.1,
    actualValue: radiusRatio,
    decision: radiusRatio > 0.1 ? "above" : "below",
    impact: radiusRatio > 0.1 ? "positive" : "negative",
    description:
      radiusRatio > 0.1
        ? "Significant transit depth detected"
        : "Very small transit depth",
  });

  // Temperature decision
  decisions.push({
    feature: "Stellar Temperature",
    threshold: 5000,
    actualValue: teff,
    decision: teff > 5000 ? "above" : "below",
    impact: teff > 5000 ? "positive" : "neutral",
    description:
      teff > 5000
        ? "Good stellar temperature for planet detection"
        : "Cooler star, harder to detect",
  });

  // Duration ratio decision
  const durationRatio = duration / (period * 24);
  decisions.push({
    feature: "Transit Duration Ratio",
    threshold: 0.05,
    actualValue: durationRatio,
    decision: durationRatio > 0.05 ? "above" : "below",
    impact: durationRatio > 0.05 ? "positive" : "negative",
    description:
      durationRatio > 0.05
        ? "Reasonable transit duration"
        : "Very short transit duration",
  });

  return decisions;
}

/**
 * Generate confidence breakdown
 */
export function generateConfidenceBreakdown(
  star: StarData
): ConfidenceBreakdown {
  const { physical, classification } = star;
  const { period, prad, teff, duration, srad } = physical;

  // Period confidence (longer periods = more confident)
  const periodConfidence = Math.min(0.9, period / 50);

  // Radius confidence (reasonable radius ratio)
  const radiusRatio = prad / srad;
  const radiusConfidence = radiusRatio > 0.05 && radiusRatio < 0.3 ? 0.8 : 0.6;

  // Temperature confidence (good stellar temperature)
  const temperatureConfidence = teff > 4000 && teff < 8000 ? 0.85 : 0.7;

  // Duration confidence (reasonable duration)
  const durationRatio = duration / (period * 24);
  const durationConfidence =
    durationRatio > 0.02 && durationRatio < 0.2 ? 0.8 : 0.6;

  // Overall confidence (weighted average)
  const overallConfidence =
    periodConfidence * 0.3 +
    radiusConfidence * 0.3 +
    temperatureConfidence * 0.2 +
    durationConfidence * 0.2;

  return {
    periodConfidence,
    radiusConfidence,
    temperatureConfidence,
    durationConfidence,
    overallConfidence,
  };
}

/**
 * Generate all explainability data for a star
 */
export function generateExplainabilityData(star: StarData): ExplainabilityData {
  return {
    featureImportances: generateFeatureImportance(star),
    sanityChecks: generateSanityChecks(star),
    modelDecisionPath: generateModelDecisionPath(star),
    confidenceBreakdown: generateConfidenceBreakdown(star),
  };
}
