import React from "react";
import { Card } from "../ui/Card";
import { SectionTitle } from "../ui/SectionTitle";
import { Chip } from "../ui/Chip";
import { Button } from "../ui/Button";
import { TargetInfo } from "../../types";
import { getStatusColor } from "../../utils/analysis";
import { cn } from "../../utils/cn";

export interface CatalogTabProps {
  targets: TargetInfo[];
  onTargetSelect: (targetId: string) => void;
}

/**
 * CatalogTab component for browsing and selecting targets
 */
export const CatalogTab: React.FC<CatalogTabProps> = ({
  targets,
  onTargetSelect,
}) => {
  return (
    <div className="mt-6">
      <SectionTitle
        title="Dataset Explorer"
        caption="Filter, sort, and pick a great demo target"
      />

      <Card className="rounded-2xl p-4">
        <div className="flex flex-wrap gap-2">
          <Chip active>Mag &lt; 12</Chip>
          <Chip>Contamination &lt; 5%</Chip>
          <Chip>Period 0.5–5d</Chip>
          <Chip>Confirmed planets</Chip>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm text-white/80">
            <thead className="text-white/60 border-b border-white/10">
              <tr>
                <th className="text-left py-2 pr-4">ID</th>
                <th className="text-left py-2 pr-4">Mission</th>
                <th className="text-left py-2 pr-4">Mag</th>
                <th className="text-left py-2 pr-4">Period (d)</th>
                <th className="text-left py-2 pr-4">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {targets.map((target) => (
                <tr key={target.id} className="border-b border-white/5">
                  <td className="py-2 pr-4">{target.id}</td>
                  <td className="py-2 pr-4">{target.mission}</td>
                  <td className="py-2 pr-4">{target.magnitude}</td>
                  <td className="py-2 pr-4">{target.period || "—"}</td>
                  <td className="py-2 pr-4">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded border",
                        getStatusColor(target.status)
                      )}
                    >
                      {target.status}
                    </span>
                  </td>
                  <td className="py-2 pr-2 text-right">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onTargetSelect(target.id)}
                    >
                      Analyze
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
