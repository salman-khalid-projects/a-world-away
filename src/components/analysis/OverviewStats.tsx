import React from 'react';
import { Stat } from '../ui/Stat';
import { Card } from '../ui/Card';
import { PhaseFoldedChart } from '../charts/PhaseFoldedChart';
import { AnalysisVerdict, PhaseFoldedData } from '../../types';
import { formatConfidence, formatPeriod, formatDepth, getConfidenceTone } from '../../utils/analysis';
import { chartColors } from '../../theme/tokens';

export interface OverviewStatsProps {
  verdict: AnalysisVerdict;
  phaseFoldedData: PhaseFoldedData[];
}

/**
 * OverviewStats component showing key metrics and phase-folded chart
 */
export const OverviewStats: React.FC<OverviewStatsProps> = ({ 
  verdict, 
  phaseFoldedData 
}) => {
  return (
    <div className="grid grid-rows-[auto_1fr] gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat 
          label="Candidate" 
          value={verdict.label} 
          hint="BLS + ML" 
          tone="good" 
        />
        <Stat 
          label="Confidence" 
          value={formatConfidence(verdict.confidence)} 
          hint="classifier score" 
          tone={getConfidenceTone(verdict.confidence)}
        />
        <Stat 
          label="Period" 
          value={formatPeriod(verdict.period)} 
          hint="BLS peak" 
        />
        <Stat 
          label="Depth" 
          value={formatDepth(verdict.depthPpm)} 
          hint={`~${(verdict.depthPpm/1e6*100).toFixed(2)}% dip`}
        />
      </div>
      
      <Card title="Phase‑folded light curve" subtitle="Transit model overlay (demo)">
        <PhaseFoldedChart
          data={phaseFoldedData}
          color={chartColors.primary}
          domain={[0.97, 1.03]}
        />
      </Card>
    </div>
  );
};

