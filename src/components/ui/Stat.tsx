import React from 'react';
import { StatProps } from '../../types';
import { tokens } from '../../theme/tokens';
import { cn } from '../../utils/cn';

/**
 * Stat component for displaying key metrics and statistics
 * Supports different visual tones for different types of data
 */
export const Stat: React.FC<StatProps> = ({ 
  label, 
  value, 
  hint, 
  tone = "default",
  className 
}) => {
  const toneClasses = {
    good: "text-emerald-300",
    warn: "text-amber-300", 
    bad: "text-rose-300",
    default: "text-white",
  };

  return (
    <div className={cn(
      tokens.card,
      tokens.border,
      tokens.radius.lg,
      tokens.spacing.md,
      className
    )}>
      <p className={cn("text-xs", tokens.subtext)}>
        {label}
      </p>
      <p className={cn(
        "text-xl md:text-2xl font-semibold",
        toneClasses[tone]
      )}>
        {value}
      </p>
      {hint && (
        <p className={cn("text-[11px]", tokens.subtext, "mt-1")}>
          {hint}
        </p>
      )}
    </div>
  );
};

