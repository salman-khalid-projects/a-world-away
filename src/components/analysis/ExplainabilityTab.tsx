import React from 'react';
import { Card } from '../ui/Card';
import { FeatureImportanceChart } from '../charts/FeatureImportanceChart';
import { FeatureImportance } from '../../types';

export interface ExplainabilityTabProps {
  featureImportances: FeatureImportance[];
}

/**
 * ExplainabilityTab component showing AI model explanations
 */
export const ExplainabilityTab: React.FC<ExplainabilityTabProps> = ({
  featureImportances,
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      <Card title="Why the model thinks it's a transit" subtitle="Feature importances (demo)">
        <FeatureImportanceChart
          data={featureImportances}
          domain={[0, 0.5]}
        />
      </Card>
      
      <Card title="Sanity checks" subtitle="Automated vetting (demo)">
        <ul className="text-sm text-white/80 list-disc pl-5 space-y-1">
          <li>
            Odd vs even transit depths:{' '}
            <span className="text-emerald-300">pass</span>
          </li>
          <li>
            Secondary eclipse at 0.5 phase:{' '}
            <span className="text-emerald-300">none</span>
          </li>
          <li>
            Transit duration vs. period:{' '}
            <span className="text-emerald-300">physically plausible</span>
          </li>
          <li>
            Outlier removal robustness:{' '}
            <span className="text-emerald-300">stable</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

