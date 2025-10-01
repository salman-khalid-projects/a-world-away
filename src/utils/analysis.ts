// Analysis utility functions

/**
 * Calculate transit depth percentage from ppm
 */
export const ppmToPercentage = (ppm: number): number => {
  return (ppm / 1e6) * 100;
};

/**
 * Format confidence as percentage
 */
export const formatConfidence = (confidence: number): string => {
  return `${Math.round(confidence * 100)}%`;
};

/**
 * Format period with appropriate units
 */
export const formatPeriod = (period: number): string => {
  return `${period} d`;
};

/**
 * Format depth with appropriate units
 */
export const formatDepth = (depthPpm: number): string => {
  return `${depthPpm} ppm`;
};

/**
 * Format duration with appropriate units
 */
export const formatDuration = (durationHr: number): string => {
  return `${durationHr} hr`;
};

/**
 * Get tone color class based on confidence level
 */
export const getConfidenceTone = (confidence: number): 'good' | 'warn' | 'bad' => {
  if (confidence >= 0.8) return 'good';
  if (confidence >= 0.6) return 'warn';
  return 'bad';
};

/**
 * Get status color class
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Confirmed':
      return 'bg-emerald-400/10 text-emerald-200 border-emerald-300/20';
    case 'Candidate':
      return 'bg-amber-400/10 text-amber-200 border-amber-300/20';
    case 'False Positive':
      return 'bg-rose-400/10 text-rose-200 border-rose-300/20';
    default:
      return 'bg-gray-400/10 text-gray-200 border-gray-300/20';
  }
};

