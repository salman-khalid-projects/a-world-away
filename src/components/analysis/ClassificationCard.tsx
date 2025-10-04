import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { StarData } from "../../types";

interface ClassificationCardProps {
  star: StarData;
}

export const ClassificationCard: React.FC<ClassificationCardProps> = ({
  star,
}) => {
  if (!star.classification) {
    return null;
  }

  const { disposition, confidence, probabilities } = star.classification;

  const getDispositionColor = (disposition: string) => {
    switch (disposition) {
      case "CONFIRMED":
        return "text-green-400";
      case "CANDIDATE":
        return "text-yellow-400";
      case "FALSE POSITIVE":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getDispositionBgColor = (disposition: string) => {
    switch (disposition) {
      case "CONFIRMED":
        return "bg-green-500/20 border-green-500/30";
      case "CANDIDATE":
        return "bg-yellow-500/20 border-yellow-500/30";
      case "FALSE POSITIVE":
        return "bg-red-500/20 border-red-500/30";
      default:
        return "bg-gray-500/20 border-gray-500/30";
    }
  };

  const getDispositionIcon = (disposition: string) => {
    switch (disposition) {
      case "CONFIRMED":
        return "✓";
      case "CANDIDATE":
        return "?";
      case "FALSE POSITIVE":
        return "✗";
      default:
        return "○";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
            AI
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Classification Result
            </h2>
            <p className="text-white/60 text-sm">
              AI Model Analysis for {star.name}
            </p>
          </div>
        </div>

        {/* Main Classification */}
        <div className="mb-6">
          <div
            className={`inline-flex items-center gap-3 px-4 py-3 rounded-2xl border ${getDispositionBgColor(
              disposition
            )}`}
          >
            <div>
              <div
                className={`text-xl font-semibold ${getDispositionColor(
                  disposition
                )}`}
              >
                {disposition}
              </div>
              <div className="text-white/60 text-sm">
                Confidence: {(confidence * 100).toFixed(1)}%
              </div>
            </div>
            <div
              className={`text-2xl font-bold ${getDispositionColor(
                disposition
              )}`}
            >
              {getDispositionIcon(disposition)}
            </div>
          </div>
        </div>

        {/* Probability Breakdown */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white mb-3">
            Probability Breakdown
          </h3>
          <div className="space-y-2">
            {Object.entries(probabilities).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-white/70 text-sm">{key}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-white/10 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${value * 100}%` }}
                    />
                  </div>
                  <span className="text-white text-sm font-medium w-12 text-right">
                    {(value * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Info */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>Model Used:</span>
            <span className="text-white">Hybrid (XGBoost + LSTM)</span>
          </div>
          <div className="flex items-center justify-between text-sm text-white/60 mt-1">
            <span>Mission:</span>
            <span className="text-white">{star.mission}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
