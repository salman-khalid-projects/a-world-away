import React from "react";
import { Card } from "../ui/Card";
import { StarData } from "../../types";

export interface OverviewTabProps {
  star: StarData;
}

/**
 * OverviewTab component showing star analysis summary
 */
export const OverviewTab: React.FC<OverviewTabProps> = ({ star }) => {
  const { physical, classification } = star;
  const { period, duration, prad, teff, srad, mag } = physical;

  // Calculate some derived properties
  const radiusRatio = prad / srad;
  const transitDepth = (radiusRatio * radiusRatio * 100).toFixed(2); // (Rp/Rs)² as percentage
  const durationDays = (duration / 24).toFixed(2);

  const getDispositionColor = (disposition: string) => {
    switch (disposition) {
      case "CONFIRMED":
        return "text-green-400";
      case "CANDIDATE":
        return "text-yellow-400";
      case "FALSE_POSITIVE":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getDispositionIcon = (disposition: string) => {
    switch (disposition) {
      case "CONFIRMED":
        return "✓";
      case "CANDIDATE":
        return "?";
      case "FALSE_POSITIVE":
        return "✗";
      default:
        return "○";
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-6">
      {/* Star Summary */}
      <Card
        title="Star Summary"
        subtitle={`${star.name} - ${star.mission} Mission`}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Star ID:</span>
            <span className="text-white font-mono">{star.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Mission:</span>
            <span className="text-white">{star.mission}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Apparent Magnitude:</span>
            <span className="text-white">{mag.toFixed(2)} mag</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Stellar Temperature:</span>
            <span className="text-white">{teff.toFixed(0)} K</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Stellar Radius:</span>
            <span className="text-white">{srad.toFixed(2)} R☉</span>
          </div>
        </div>
      </Card>

      {/* Planet Properties */}
      <Card
        title="Planet Properties"
        subtitle="Orbital and physical characteristics"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Orbital Period:</span>
            <span className="text-cyan-300 font-semibold">
              {period.toFixed(2)} days
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Transit Duration:</span>
            <span className="text-cyan-300">{durationDays} days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Planet Radius:</span>
            <span className="text-cyan-300">{prad.toFixed(2)} R⊕</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Transit Depth:</span>
            <span className="text-cyan-300">{transitDepth}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">Radius Ratio:</span>
            <span className="text-cyan-300">{radiusRatio.toFixed(3)}</span>
          </div>
        </div>
      </Card>

      {/* AI Classification */}
      <Card
        title="AI Classification"
        subtitle="Machine learning analysis results"
      >
        {classification ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Disposition:</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {getDispositionIcon(classification.disposition)}
                </span>
                <span
                  className={`font-semibold ${getDispositionColor(
                    classification.disposition
                  )}`}
                >
                  {classification.disposition}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Confidence:</span>
              <span className="text-cyan-300 font-semibold">
                {(classification.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Model Used:</span>
              <span className="text-white">{classification.model_used}</span>
            </div>

            {/* Probability Breakdown */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-sm text-white/70 mb-2">
                Probability Breakdown:
              </div>
              <div className="space-y-2">
                {Object.entries(classification.probabilities).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-white/60 text-sm">{key}:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-white/10 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                            style={{ width: `${value * 100}%` }}
                          />
                        </div>
                        <span className="text-white text-sm w-12 text-right">
                          {(value * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-white/60">No classification available</p>
          </div>
        )}
      </Card>

      {/* Quick Facts */}
      <Card
        title="Quick Facts"
        subtitle="Interesting insights about this system"
      >
        <div className="space-y-3">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-sm text-white/70 mb-1">Transit Frequency</div>
            <div className="text-white">
              Every {period.toFixed(1)} days
              {period < 1
                ? " (very frequent)"
                : period < 10
                ? " (frequent)"
                : " (moderate)"}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-sm text-white/70 mb-1">Planet Size</div>
            <div className="text-white">
              {prad < 1.5
                ? "Earth-sized"
                : prad < 4
                ? "Super-Earth"
                : "Gas Giant"}{" "}
              ({prad.toFixed(1)}× Earth)
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-sm text-white/70 mb-1">Stellar Type</div>
            <div className="text-white">
              {teff < 4000
                ? "M-dwarf"
                : teff < 6000
                ? "K-dwarf"
                : teff < 7500
                ? "G-dwarf"
                : "F-dwarf"}{" "}
              ({teff.toFixed(0)}K)
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-sm text-white/70 mb-1">Observability</div>
            <div className="text-white">
              {mag < 10
                ? "Very bright"
                : mag < 12
                ? "Bright"
                : mag < 14
                ? "Moderate"
                : "Faint"}{" "}
              ({mag.toFixed(1)} mag)
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
