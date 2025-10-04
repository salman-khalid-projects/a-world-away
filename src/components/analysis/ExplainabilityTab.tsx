import React, { useMemo } from "react";
import { Card } from "../ui/Card";
import { FeatureImportanceChart } from "../charts/FeatureImportanceChart";
import { FeatureImportance, StarData } from "../../types";
import {
  generateExplainabilityData,
  ExplainabilityData,
} from "../../utils/explainabilityGenerator";

export interface ExplainabilityTabProps {
  star: StarData;
}

/**
 * ExplainabilityTab component showing AI model explanations
 */
export const ExplainabilityTab: React.FC<ExplainabilityTabProps> = ({
  star,
}) => {
  // Generate realistic explainability data based on star properties
  const explainabilityData = useMemo(() => {
    return generateExplainabilityData(star);
  }, [star]);

  const {
    featureImportances,
    sanityChecks,
    modelDecisionPath,
    confidenceBreakdown,
  } = explainabilityData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "text-emerald-300";
      case "warning":
        return "text-yellow-300";
      case "fail":
        return "text-red-300";
      default:
        return "text-gray-300";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-emerald-300";
      case "negative":
        return "text-red-300";
      case "neutral":
        return "text-yellow-300";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      <Card
        title="Feature Importance"
        subtitle={`${star.name} - AI model insights`}
      >
        <FeatureImportanceChart data={featureImportances} domain={[0, 0.5]} />
      </Card>

      <Card title="Sanity Checks" subtitle="Automated validation results">
        <ul className="text-sm text-white/80 space-y-2">
          {sanityChecks.map((check, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{check.name}</span>
                <span className="text-white/60 ml-2">
                  ({check.description})
                </span>
                {check.value && (
                  <span className="text-white/60 ml-2">- {check.value}</span>
                )}
              </div>
              <span className={getStatusColor(check.status)}>
                {check.status.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card
        title="Model Decision Path"
        subtitle="How the AI reached its conclusion"
      >
        <div className="space-y-3">
          {modelDecisionPath.map((decision, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-white">
                  {decision.feature}
                </span>
                <span className={`text-sm ${getImpactColor(decision.impact)}`}>
                  {decision.impact.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-white/70 mb-1">
                {decision.actualValue.toFixed(3)} {decision.decision}{" "}
                {decision.threshold}
              </div>
              <div className="text-xs text-white/60">
                {decision.description}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Confidence Breakdown"
        subtitle="Detailed confidence analysis"
      >
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Period Analysis</span>
            <span className="text-emerald-300">
              {(confidenceBreakdown.periodConfidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Radius Analysis</span>
            <span className="text-emerald-300">
              {(confidenceBreakdown.radiusConfidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Temperature Analysis</span>
            <span className="text-emerald-300">
              {(confidenceBreakdown.temperatureConfidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/70">Duration Analysis</span>
            <span className="text-emerald-300">
              {(confidenceBreakdown.durationConfidence * 100).toFixed(1)}%
            </span>
          </div>
          <div className="border-t border-white/10 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-white">Overall Confidence</span>
              <span className="text-cyan-300 font-semibold">
                {(confidenceBreakdown.overallConfidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
