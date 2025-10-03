import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { tokens } from "../../theme/tokens";
import { cn } from "../../utils/cn";

export interface StarData {
  id: string;
  name: string;
  x: number;
  y: number;
  magnitude: number;
  color: string;
  isSelected?: boolean;
}

export interface StarPickerProps {
  onStarSelect: (starId: string) => void;
  onManualInput: (starId: string) => void;
  onAnalyze: () => void;
  selectedStarId?: string;
}

// Demo star data with realistic positions and properties
const demoStars: StarData[] = [
  {
    id: "TIC 307210830",
    name: "HD 209458",
    x: 20,
    y: 30,
    magnitude: 7.65,
    color: "#93c5fd",
  },
  {
    id: "Kepler-10",
    name: "Kepler-10",
    x: 60,
    y: 25,
    magnitude: 10.96,
    color: "#a78bfa",
  },
  {
    id: "EPIC 201367065",
    name: "K2-3",
    x: 45,
    y: 60,
    magnitude: 12.17,
    color: "#34d399",
  },
  {
    id: "TIC 261136679",
    name: "TOI-700",
    x: 75,
    y: 45,
    magnitude: 13.1,
    color: "#fbbf24",
  },
  {
    id: "TIC 142748283",
    name: "TOI-715",
    x: 30,
    y: 70,
    magnitude: 12.5,
    color: "#f87171",
  },
  {
    id: "TIC 172370679",
    name: "TOI-1696",
    x: 80,
    y: 20,
    magnitude: 11.8,
    color: "#c084fc",
  },
];

/**
 * Interactive star picker with visual space background
 */
export const StarPicker: React.FC<StarPickerProps> = ({
  onStarSelect,
  onManualInput,
  onAnalyze,
  selectedStarId,
}) => {
  const [manualInput, setManualInput] = useState("");
  const [showManualInput, setShowManualInput] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStarClick = (starId: string) => {
    onStarSelect(starId);
  };

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      onManualInput(manualInput.trim());
      setManualInput("");
      setShowManualInput(false);
    }
  };

  const getStarSize = (magnitude: number) => {
    // Larger stars (lower magnitude) appear bigger
    const baseSize = 4;
    const maxSize = 12;
    const size = Math.max(baseSize, maxSize - magnitude * 0.5);
    return Math.min(size, maxSize);
  };

  const getStarGlow = (magnitude: number) => {
    // Brighter stars get more glow
    const intensity = Math.max(0.3, 1 - magnitude * 0.1);
    return intensity;
  };

  return (
    <div className="min-h-screen bg-space-dark relative overflow-hidden">
      {/* Space Background with Stars */}
      <div className="absolute inset-0 bg-space-gradient">
        {/* Animated background stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 md:p-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
            Pick a Star
          </h1>
          <p
            className={cn(
              "text-center text-lg md:text-xl max-w-2xl mx-auto",
              tokens.subtext
            )}
          >
            Click on a star to select it, or enter a target ID manually. Each
            star represents a real exoplanet system waiting to be explored.
          </p>
        </motion.div>

        {/* Interactive Star Field */}
        <div className="flex-1 relative" ref={containerRef}>
          <div className="absolute inset-0 p-8">
            {demoStars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute cursor-pointer group"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleStarClick(star.id)}
                onMouseEnter={() => setHoveredStar(star.id)}
                onMouseLeave={() => setHoveredStar(null)}
              >
                {/* Star */}
                <div
                  className="rounded-full relative"
                  style={{
                    width: getStarSize(star.magnitude),
                    height: getStarSize(star.magnitude),
                    backgroundColor: star.color,
                    boxShadow: `0 0 ${getStarGlow(star.magnitude) * 20}px ${
                      star.color
                    }80`,
                  }}
                />

                {/* Selection indicator */}
                {selectedStarId === star.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-300"
                    style={{
                      width: getStarSize(star.magnitude) + 8,
                      height: getStarSize(star.magnitude) + 8,
                      left: -4,
                      top: -4,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}

                {/* Star label on hover */}
                <AnimatePresence>
                  {hoveredStar === star.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap"
                    >
                      <div
                        className={cn(
                          "px-3 py-1 rounded-lg text-sm",
                          tokens.bgSoft,
                          tokens.border
                        )}
                      >
                        <div className="font-medium text-white">
                          {star.name}
                        </div>
                        <div className="text-xs text-white/60">{star.id}</div>
                        <div className="text-xs text-white/60">
                          Mag: {star.magnitude}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-6 md:p-8"
        >
          <Card className="max-w-4xl mx-auto rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Selected Star Display */}
              <div className="flex-1">
                {selectedStarId ? (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                    <div>
                      <div className="font-medium text-white">
                        {demoStars.find((s) => s.id === selectedStarId)?.name ||
                          selectedStarId}
                      </div>
                      <div className="text-sm text-white/60">
                        {selectedStarId}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-white/60">No star selected</div>
                )}
              </div>

              {/* Manual Input */}
              <div className="flex gap-2">
                {!showManualInput ? (
                  <Button
                    onClick={() => setShowManualInput(true)}
                    variant="secondary"
                    size="sm"
                  >
                    Manual Input
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      placeholder="Enter target ID..."
                      className={cn(
                        "px-3 py-2 bg-transparent text-white border border-white/20 rounded-lg",
                        "focus:outline-none focus:ring-2 focus:ring-cyan-300/30",
                        "placeholder-white/40"
                      )}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleManualSubmit()
                      }
                      autoFocus
                    />
                    <Button
                      onClick={handleManualSubmit}
                      variant="primary"
                      size="sm"
                    >
                      Add
                    </Button>
                    <Button
                      onClick={() => {
                        setShowManualInput(false);
                        setManualInput("");
                      }}
                      variant="secondary"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* Analyze Button */}
              <Button
                onClick={onAnalyze}
                variant="primary"
                disabled={!selectedStarId}
                className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400"
              >
                Analyze Star
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

