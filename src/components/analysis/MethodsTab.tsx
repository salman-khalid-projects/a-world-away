import React from 'react';
import { Card } from '../ui/Card';

/**
 * MethodsTab component showing methodology and limitations
 */
export const MethodsTab: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <Card title="How it works" subtitle="Designed for transparency">
        <ol className="list-decimal pl-5 text-sm text-white/80 space-y-1">
          <li>Fetch light curve for a target (ID or upload).</li>
          <li>Detrend and remove systematics/outliers.</li>
          <li>Run BLS to find periodic dips; pick best period.</li>
          <li>Phase-fold the light curve and fit a simple model.</li>
          <li>Compute features; show AI verdict with confidence.</li>
        </ol>
      </Card>
      
      <Card title="Limitations & next steps" subtitle="Scientific humility">
        <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
          <li>Centroid shift analysis not yet included in UI.</li>
          <li>False positives (EBs/systematics) need extra vetting.</li>
          <li>Planned: Archive cross‑match drawer, shareable links.</li>
        </ul>
      </Card>
    </div>
  );
};

