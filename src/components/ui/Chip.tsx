import React from 'react';
import { ChipProps } from '../../types';
import { tokens } from '../../theme/tokens';
import { cn } from '../../utils/cn';

/**
 * Chip component for interactive tags and filters
 * Supports active state and click handling
 */
export const Chip: React.FC<ChipProps> = ({ 
  children, 
  onClick, 
  active = false,
  className 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1 rounded-full border text-xs transition-colors",
        active 
          ? "border-cyan-300/60 bg-cyan-300/10 text-cyan-200" 
          : "border-white/10 bg-white/5 text-white/80",
        tokens.hover,
        className
      )}
    >
      {children}
    </button>
  );
};

