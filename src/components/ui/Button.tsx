import React from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

/**
 * Button component with consistent styling and variants
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseClasses =
    "rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300/30";

  const variantClasses = {
    primary:
      "bg-cyan-400/20 text-cyan-100 border border-cyan-300/30 hover:bg-cyan-400/30",
    secondary: "border border-white/10 text-white/80 hover:bg-white/10",
    ghost: "text-white/80 hover:bg-white/10",
    outline: "border border-white/30 text-white hover:bg-white/10",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
