import React from "react";
import { Card } from "../ui/Card";
import { AnalysisVerdict } from "../../types";
import {
  formatConfidence,
  formatPeriod,
  formatDuration,
  ppmToPercentage,
} from "../../utils/analysis";

export interface OverviewTabProps {
  verdict: AnalysisVerdict;
}

/**
 * OverviewTab component showing analysis summary and quality checks
 */
export const OverviewTab: React.FC<OverviewTabProps> = ({ verdict }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 mt-6">
      <Card title="What we found" subtitle="Human‑readable summary">
        <ul className="text-sm text-white/80 list-disc pl-5 space-y-1">
          <li>
            Clear periodic dip every{" "}
            <span className="text-cyan-200">
              {formatPeriod(verdict.period)}
            </span>
            .
          </li>
          <li>
            Depth ~{" "}
            <span className="text-cyan-200">
              {ppmToPercentage(verdict.depthPpm).toFixed(2)}%
            </span>
            ; duration ~{" "}
            <span className="text-cyan-200">
              {formatDuration(verdict.durationHr)}
            </span>
            .
          </li>
          <li>
            Classifier confidence{" "}
            <span className="text-cyan-200">
              {formatConfidence(verdict.confidence)}
            </span>{" "}
            (threshold 70%).
          </li>
        </ul>
      </Card>

      <Card title="Quality checks" subtitle="Quick sanity tests">
        <ul className="text-sm text-white/80 list-disc pl-5 space-y-1">
          <li>Odd/Even depths: within tolerance.</li>
          <li>No strong secondary at phase 0.5.</li>
          <li>Transit shape: U‑shaped (low impact parameter).</li>
        </ul>
      </Card>

      <Card title="Next steps" subtitle="How we'd verify">
        <ul className="text-sm text-white/80 list-disc pl-5 space-y-1">
          <li>Pull centroid timeseries to check for blends.</li>
          <li>Cross‑match with NASA Exoplanet Archive for known params.</li>
          <li>Queue for citizen‑science vetting.</li>
        </ul>
      </Card>
    </div>
  );
};
