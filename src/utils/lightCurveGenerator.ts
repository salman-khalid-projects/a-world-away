import {
  StarData,
  LightCurveData,
  PhaseFoldedData,
  PeriodogramData,
} from "../types";

/**
 * Generate realistic light curve data based on real star physical properties
 */

export interface LightCurveConfig {
  duration: number; // Duration in days
  samplingRate: number; // Points per day
  noiseLevel: number; // Noise as fraction of signal
}

/**
 * Generate a realistic light curve with transit signal
 */
export function generateRealisticLightCurve(
  star: StarData,
  config: LightCurveConfig = {
    duration: 30, // 30 days of observations
    samplingRate: 30, // 30 points per day (Kepler-like)
    noiseLevel: 0.001, // 0.1% noise
  }
): LightCurveData[] {
  const { physical } = star;
  const { period, duration, prad, srad } = physical;

  // Calculate transit parameters
  const transitDepth = Math.pow(prad / srad, 2); // (Rp/Rs)²
  const transitDurationDays = duration / 24; // Convert hours to days
  const totalPoints = Math.floor(config.duration * config.samplingRate);

  const lightCurve: LightCurveData[] = [];

  for (let i = 0; i < totalPoints; i++) {
    const time = i / config.samplingRate; // Time in days
    const phase = (time % period) / period; // Phase from 0 to 1

    // Calculate flux
    let flux = 1.0; // Baseline flux

    // Add transit signal
    if (isInTransit(phase, transitDurationDays, period)) {
      flux -= transitDepth;
    }

    // Add realistic noise
    const noise = (Math.random() - 0.5) * config.noiseLevel;
    flux += noise;

    // Add some stellar variability (very small)
    const stellarVariability = Math.sin(time * 0.1) * 0.0005;
    flux += stellarVariability;

    lightCurve.push({
      t: time,
      flux: Math.max(0.95, Math.min(1.05, flux)), // Clamp to reasonable range
    });
  }

  return lightCurve;
}

/**
 * Check if a given phase is during transit
 */
function isInTransit(
  phase: number,
  transitDurationDays: number,
  period: number
): boolean {
  const transitPhaseWidth = transitDurationDays / period / 2; // Half-width in phase
  const centerPhase = 0.5; // Transit center at phase 0.5

  return Math.abs(phase - centerPhase) < transitPhaseWidth;
}

/**
 * Generate detrended light curve (remove long-term trends)
 */
export function generateDetrendedLightCurve(
  rawLightCurve: LightCurveData[],
  star: StarData
): LightCurveData[] {
  const { period } = star.physical;

  // Simple detrending: remove long-term trends while preserving transits
  return rawLightCurve.map((point, _index) => {
    // Remove very slow trends (longer than 3x the orbital period)
    const trendRemoval = Math.sin(point.t / (period * 3)) * 0.002;

    return {
      t: point.t,
      flux: point.flux - trendRemoval,
    };
  });
}

/**
 * Generate realistic periodogram data
 */
export function generateRealisticPeriodogram(
  star: StarData,
  _lightCurve: LightCurveData[]
): PeriodogramData[] {
  const { period } = star.physical;
  const periods: PeriodogramData[] = [];

  // Generate periodogram around the known period
  const minPeriod = period * 0.5;
  const maxPeriod = period * 2.0;
  const numPoints = 100;

  for (let i = 0; i < numPoints; i++) {
    const testPeriod = minPeriod + (i / numPoints) * (maxPeriod - minPeriod);

    // Calculate power based on how close to the real period
    const periodRatio = testPeriod / period;
    let power = 0;

    if (Math.abs(periodRatio - 1.0) < 0.1) {
      // Peak near the real period
      power = 1.0 - Math.abs(periodRatio - 1.0) * 10;
    } else {
      // Background noise
      power = Math.random() * 0.3;
    }

    // Add some realistic structure
    power += Math.sin(testPeriod * 2) * 0.1;
    power = Math.max(0, Math.min(1, power));

    periods.push({
      period: testPeriod,
      power: power,
    });
  }

  return periods;
}

/**
 * Generate phase-folded data
 */
export function generatePhaseFoldedData(
  lightCurve: LightCurveData[],
  star: StarData
): PhaseFoldedData[] {
  const { period } = star.physical;

  return lightCurve.map((point) => ({
    phase: (point.t % period) / period,
    flux: point.flux,
  }));
}

/**
 * Generate all detection data for a star
 */
export function generateDetectionData(star: StarData) {
  const rawLightCurve = generateRealisticLightCurve(star);
  const detrended = generateDetrendedLightCurve(rawLightCurve, star);
  const periodogram = generateRealisticPeriodogram(star, rawLightCurve);
  const phaseFolded = generatePhaseFoldedData(rawLightCurve, star);

  return {
    rawLightCurve,
    detrended,
    periodogram,
    phaseFolded,
  };
}
