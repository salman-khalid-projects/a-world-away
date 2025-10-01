import React from 'react';
import { Card } from '../ui/Card';
import { LightCurveChart } from '../charts/LightCurveChart';
import { PeriodogramChart } from '../charts/PeriodogramChart';
import { PhaseFoldedChart } from '../charts/PhaseFoldedChart';
import { LightCurveData, PeriodogramData, PhaseFoldedData } from '../../types';
import { chartColors } from '../../theme/tokens';

export interface DetectionTabProps {
  rawLightCurve: LightCurveData[];
  detrended: LightCurveData[];
  periodogram: PeriodogramData[];
  phaseFolded: PhaseFoldedData[];
}

/**
 * DetectionTab component showing the detection analysis pipeline
 */
export const DetectionTab: React.FC<DetectionTabProps> = ({
  rawLightCurve,
  detrended,
  periodogram,
  phaseFolded,
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      <Card title="Raw light curve" subtitle="As observed (demo)">
        <LightCurveChart
          data={rawLightCurve}
          color={chartColors.primary}
          domain={[0.96, 1.04]}
        />
      </Card>
      
      <Card title="Detrended" subtitle="Systematics removed (demo)">
        <LightCurveChart
          data={detrended}
          color={chartColors.secondary}
          domain={[0.98, 1.02]}
        />
      </Card>
      
      <Card title="BLS Periodogram" subtitle="Peak marks candidate period (demo)">
        <PeriodogramChart
          data={periodogram}
          color={chartColors.success}
        />
      </Card>
      
      <Card title="Phase‑folded" subtitle="Transit stacked at best period (demo)">
        <PhaseFoldedChart
          data={phaseFolded}
          color={chartColors.primary}
          domain={[0.98, 1.02]}
        />
      </Card>
    </div>
  );
};

