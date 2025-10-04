import React from "react";
import { cn } from "../../utils/cn";

/**
 * Footer component with attribution and design notes
 */
export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          className={cn(
            "text-[12px] text-white/50 flex items-center justify-between flex-col sm:flex-row gap-2"
          )}
        >
          <p>Built for NASA Space Apps 2025 — UI Prototype</p>
          <p className="flex items-center gap-2">
            <span>
              <img
                className="w-4 h-4 rounded-full"
                src="/dist/assets/expace-CGAsMBDL.svg"
                alt="Expace"
              />
            </span>
            <span>Team: Expace - Al Iman School</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
