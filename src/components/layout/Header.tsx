import React from "react";
import { Button } from "../ui/Button";
import { tokens } from "../../theme/tokens";
import { cn } from "../../utils/cn";

export interface HeaderProps {
  judgesMode: boolean;
  onToggleJudgesMode: () => void;
}

/**
 * Header component with logo, title, and control buttons
 */
export const Header: React.FC<HeaderProps> = ({
  judgesMode,
  onToggleJudgesMode,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-space-dark/70">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400/80 to-violet-400/80" />
          <div>
            <p className="text-white font-semibold leading-tight">
              A World Away
            </p>
            <p className={cn("text-[11px]", tokens.subtext)}>
              Hunting for Exoplanets with AI - Al Iman School
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={onToggleJudgesMode}
            variant="secondary"
            size="sm"
            aria-pressed={judgesMode}
          >
            {judgesMode ? "Demo Mode: On" : "Demo Mode: Off"}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              // Handle demo video script action
            }}
          >
            Demo Video
          </Button>
        </div>
      </div>
    </header>
  );
};
