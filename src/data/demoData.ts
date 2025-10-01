import { LightCurveData, PhaseFoldedData, PeriodogramData, FeatureImportance, AnalysisVerdict, TargetInfo } from '../types';

// Generate synthetic light curve data with transit signals
export const generateLightCurve = (length: number = 400): LightCurveData[] => {
  return Array.from({ length }, (_, i) => ({
    t: i,
    flux: 1 + Math.sin(i / 22) * 0.005 - (i % 120 < 6 ? 0.015 : 0),
  }));
};

// Generate detrended light curve data
export const generateDetrendedLightCurve = (rawData: LightCurveData[]): LightCurveData[] => {
  return rawData.map((d) => ({ 
    t: d.t, 
    flux: d.flux + 0.005 
  }));
};

// Generate BLS periodogram data
export const generatePeriodogram = (length: number = 80): PeriodogramData[] => {
  return Array.from({ length }, (_, i) => ({
    period: 0.5 + i * 0.05,
    power: Math.max(0, Math.sin(i / 5) * 0.4 + (i === 30 ? 1 : 0) + 0.4),
  }));
};

// Generate phase-folded data
export const generatePhaseFoldedData = (detrendedData: LightCurveData[]): PhaseFoldedData[] => {
  return detrendedData.map((d, i) => ({
    phase: (i % 100) / 100,
    flux: d.flux
  }));
};

// Feature importance data for explainability
export const featureImportances: FeatureImportance[] = [
  { name: "BLS Power", value: 0.35 },
  { name: "SDE", value: 0.25 },
  { name: "Depth", value: 0.18 },
  { name: "Duration", value: 0.12 },
  { name: "Odd/Even Δ", value: 0.10 },
];

// Sample analysis verdict
export const sampleVerdict: AnalysisVerdict = {
  label: "Transit-like",
  confidence: 0.86,
  period: 1.52,
  depthPpm: 1200,
  durationHr: 2.8,
};

// Sample targets for the catalog
export const sampleTargets: TargetInfo[] = [
  { 
    id: "TIC 307210830", 
    mission: "TESS", 
    magnitude: 10.8, 
    period: 1.52, 
    status: "Candidate" 
  },
  { 
    id: "Kepler-10", 
    mission: "Kepler", 
    magnitude: 11.1, 
    period: 0.84, 
    status: "Confirmed" 
  },
  { 
    id: "EPIC 201367065", 
    mission: "K2", 
    magnitude: 12.4, 
    period: 4.78, 
    status: "Candidate" 
  },
];

// Generate all demo data
export const generateDemoData = () => {
  const rawLightCurve = generateLightCurve();
  const detrended = generateDetrendedLightCurve(rawLightCurve);
  const periodogram = generatePeriodogram();
  const phaseFolded = generatePhaseFoldedData(detrended);
  
  return {
    rawLightCurve,
    detrended,
    periodogram,
    phaseFolded,
    featureImportances,
    verdict: sampleVerdict,
    targets: sampleTargets,
  };
};

