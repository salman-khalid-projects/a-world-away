import React from "react";
import { CardProps } from "../../types";
import { tokens } from "../../theme/tokens";
import { cn } from "../../utils/cn";

/**
 * Card component for consistent content containers
 * Provides a reusable card layout with optional title, subtitle, and right-aligned content
 */
export const Card: React.FC<CardProps & { onClick?: () => void }> = ({
  title,
  subtitle,
  right,
  children,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn(
        tokens.card,
        tokens.border,
        tokens.radius.lg,
        tokens.spacing.md,
        tokens.shadow.xl,
        "backdrop-blur",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {(title || subtitle || right) && (
        <div className="flex items-start justify-between gap-3 pb-4">
          <div>
            {title && (
              <h3
                className={cn(
                  "text-sm md:text-base font-semibold",
                  tokens.text
                )}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p className={cn("text-xs", tokens.subtext)}>{subtitle}</p>
            )}
          </div>
          {right}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};
