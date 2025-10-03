import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ScreenTransitionProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

/**
 * Smooth screen transition wrapper component
 */
export const ScreenTransition: React.FC<ScreenTransitionProps> = ({
  children,
  direction = "right",
  className = "",
}) => {
  const getVariants = () => {
    const baseVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };

    switch (direction) {
      case "left":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, x: -100 },
          animate: { ...baseVariants.animate, x: 0 },
          exit: { ...baseVariants.exit, x: -100 },
        };
      case "right":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, x: 100 },
          animate: { ...baseVariants.animate, x: 0 },
          exit: { ...baseVariants.exit, x: 100 },
        };
      case "up":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, y: -100 },
          animate: { ...baseVariants.animate, y: 0 },
          exit: { ...baseVariants.exit, y: -100 },
        };
      case "down":
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, y: 100 },
          animate: { ...baseVariants.animate, y: 0 },
          exit: { ...baseVariants.exit, y: 100 },
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1], // Custom easing for smooth feel
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Page transition wrapper with AnimatePresence
 */
export const PageTransition: React.FC<{
  children: React.ReactNode;
  key: string | number;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}> = ({ children, key, direction = "right", className = "" }) => {
  return (
    <AnimatePresence mode="wait">
      <ScreenTransition key={key} direction={direction} className={className}>
        {children}
      </ScreenTransition>
    </AnimatePresence>
  );
};

