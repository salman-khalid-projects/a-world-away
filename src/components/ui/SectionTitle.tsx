import React from 'react';
import { SectionTitleProps } from '../../types';
import { tokens } from '../../theme/tokens';
import { cn } from '../../utils/cn';

/**
 * SectionTitle component for consistent section headers
 * Provides title and optional caption styling
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  caption,
  className 
}) => {
  return (
    <div className={cn("mb-3", className)}>
      <h2 className="text-white text-lg md:text-xl font-semibold">
        {title}
      </h2>
      {caption && (
        <p className={cn("text-xs", tokens.subtext)}>
          {caption}
        </p>
      )}
    </div>
  );
};

