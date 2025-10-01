import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Chip } from "../ui/Chip";
import { tokens } from "../../theme/tokens";
import { cn } from "../../utils/cn";

export interface AnalysisFormProps {
  dataset: string;
  targetId: string;
  onDatasetChange: (dataset: string) => void;
  onTargetIdChange: (targetId: string) => void;
  onAnalyze: () => void;
  onUpload: () => void;
}

/**
 * AnalysisForm component for target selection and dataset configuration
 */
export const AnalysisForm: React.FC<AnalysisFormProps> = ({
  dataset,
  targetId,
  onDatasetChange,
  onTargetIdChange,
  onAnalyze,
  onUpload,
}) => {
  const quickTargets = ["TIC 307210830", "Kepler-10", "EPIC 201367065"];

  return (
    <Card className="rounded-3xl p-6 md:p-8 shadow-2xl">
      <h1 className="text-2xl md:text-4xl font-semibold text-white tracking-tight">
        Pick a star. <span className="text-cyan-200">Find a transit.</span>
      </h1>
      <p className={cn("mt-2 md:mt-3 max-w-prose", tokens.subtext)}>
        This UI showcases the complete analysis flow we'll demo to researchers:
        search a target, visualize the light curve, run detection, and explain
        the AI verdict.
      </p>

      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        <div className={cn(tokens.border, "rounded-2xl p-4", tokens.bgSoft)}>
          <label className={cn("text-xs", tokens.subtext)}>Dataset</label>
          <select
            className="w-full mt-1 bg-transparent text-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
            value={dataset}
            onChange={(e) => onDatasetChange(e.target.value)}
          >
            <option className="bg-space-dark">TESS</option>
            <option className="bg-space-dark">Kepler</option>
            <option className="bg-space-dark">K2</option>
          </select>
        </div>

        <div className={cn(tokens.border, "rounded-2xl p-4", tokens.bgSoft)}>
          <label className={cn("text-xs", tokens.subtext)}>
            Target ID (TIC/Kepler/EPIC)
          </label>
          <input
            className="w-full mt-1 bg-transparent text-white placeholder-white/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
            value={targetId}
            onChange={(e) => onTargetIdChange(e.target.value)}
            placeholder="e.g., TIC 307210830"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {quickTargets.map((target) => (
          <Chip
            key={target}
            active={targetId === target}
            onClick={() => onTargetIdChange(target)}
          >
            Try: {target}
          </Chip>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <Button onClick={onAnalyze} variant="primary">
          Analyze
        </Button>
        <Button onClick={onUpload} variant="secondary">
          Upload LC (CSV/FITS)
        </Button>
      </div>

      <p className={cn("text-[11px] mt-3", tokens.subtext)}>
        *Actions are stubbed for UI review. Charts render demo data.
      </p>
    </Card>
  );
};
