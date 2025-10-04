import React, { useMemo } from "react";
import { Card } from "../ui/Card";
import { LightCurveChart } from "../charts/LightCurveChart";
import { PeriodogramChart } from "../charts/PeriodogramChart";
import { PhaseFoldedChart } from "../charts/PhaseFoldedChart";
import {
  LightCurveData,
  PeriodogramData,
  PhaseFoldedData,
  StarData,
} from "../../types";
import { chartColors } from "../../theme/tokens";
import { generateDetectionData } from "../../utils/lightCurveGenerator";

export interface DetectionTabProps {
  star: StarData;
}

/**
 * DetectionTab component showing the detection analysis pipeline
 */
export const DetectionTab: React.FC<DetectionTabProps> = ({ star }) => {
  // Generate realistic detection data based on star properties
  const detectionData = useMemo(() => {
    return generateDetectionData(star);
  }, [star]);

  const { rawLightCurve, detrended, periodogram, phaseFolded } = detectionData;
  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      <Card
        title="Raw light curve"
        subtitle={`${star.name} - Real data simulation`}
      >
        <LightCurveChart
          data={rawLightCurve}
          color={chartColors.primary}
          domain={[0.96, 1.04]}
        />
      </Card>

      <Card title="Detrended" subtitle="Systematics removed">
        <LightCurveChart
          data={detrended}
          color={chartColors.secondary}
          domain={[0.98, 1.02]}
        />
      </Card>

      <Card
        title="BLS Periodogram"
        subtitle={`Peak at ${star.physical.period.toFixed(2)} days`}
      >
        <PeriodogramChart data={periodogram} color={chartColors.success} />
      </Card>

      <Card
        title="Phase‑folded"
        subtitle={`Transit stacked at ${star.physical.period.toFixed(
          2
        )}d period`}
      >
        <PhaseFoldedChart
          data={phaseFolded}
          color={chartColors.primary}
          domain={[0.98, 1.02]}
        />
      </Card>
    </div>
  );
};
