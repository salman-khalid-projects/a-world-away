import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { StarData } from "../../types";
import { getRealNASAData } from "../../data/realExoplanetData";

export interface StarPickerProps {
  onStarSelect: (star: StarData) => void;
  onAnalyze: () => void;
  selectedStar?: StarData;
}

// Get real star data from our models with different classification types
const getRealStars = (): StarData[] => {
  const keplerStars = getRealNASAData("kepler");
  const tessStars = getRealNASAData("tess");
  const allStars = [...keplerStars, ...tessStars];

  // Ensure each star has a unique ID by using name as fallback
  const uniqueStars = allStars.map((star, index) => ({
    ...star,
    id: `${star.id}-${star.name.replace(/\s+/g, "-")}-${index}`,
  }));

  // Select 6 specific unique stars by name to avoid duplicates
  // Mix: 2 Confirmed, 3 Candidates, 1 False Positive
  const selectedStarNames = [
    "Kepler-452 b", // Confirmed (Earth-like)
    "Kepler-22 b", // Confirmed (super-Earth)
    "Kepler-227 b", // Candidate
    "Kepler-385 b", // Candidate
    "TOI-270 b", // Candidate
    "Kepler-999 b", // False Positive
  ];

  const selectedStars = selectedStarNames
    .map((name) => {
      const star = uniqueStars.find((star) => star.name === name);
      console.log(`🔍 Looking for ${name}:`, star ? "Found" : "Not found");
      return star;
    })
    .filter(Boolean) as StarData[];

  console.log(
    `📊 Selected stars:`,
    selectedStars.map((s) => s.name)
  );

  // If we don't have enough stars, fill with any available unique stars
  if (selectedStars.length < 6) {
    const remainingStars = uniqueStars.filter(
      (star) => !selectedStars.some((selected) => selected.id === star.id)
    );
    console.log(
      `📋 Adding ${6 - selectedStars.length} remaining stars:`,
      remainingStars.slice(0, 6 - selectedStars.length).map((s) => s.name)
    );
    selectedStars.push(...remainingStars.slice(0, 6 - selectedStars.length));
  }

  return selectedStars.slice(0, 6); // Limit to 6 stars for particle UI
};

/**
 * Interactive star picker with floating star particles and real NASA data
 */
export const StarPicker: React.FC<StarPickerProps> = ({
  onStarSelect,
  onAnalyze,
  selectedStar,
}) => {
  const [stars, setStars] = useState<StarData[]>([]);
  const [hoveredStar, setHoveredStar] = useState<StarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load real stars on component mount
  useEffect(() => {
    const loadStars = async () => {
      setIsLoading(true);
      try {
        const realStars = getRealStars();
        setStars(realStars);
        console.log(
          `✅ Loaded ${realStars.length} real NASA stars with classifications`
        );
        console.log(
          "🌟 Star details:",
          realStars.map((s) => ({
            name: s.name,
            classification: s.classification?.disposition,
            confidence: s.classification?.confidence,
          }))
        );
      } catch (error) {
        console.error("Error loading stars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStars();
  }, []);

  const handleStarClick = (star: StarData) => {
    onStarSelect(star);
  };

  const getStarSize = (star: StarData) => {
    // Size based on magnitude (brighter = larger)
    const baseSize = 8;
    const magnitudeFactor = Math.max(0.5, 2 - (star.physical.mag - 10) / 5);
    return baseSize * magnitudeFactor;
  };

  const getStarGlow = (star: StarData) => {
    const disposition = star.classification?.disposition;
    switch (disposition) {
      case "CONFIRMED":
        return "0 0 20px rgba(16, 185, 129, 0.6)";
      case "CANDIDATE":
        return "0 0 20px rgba(245, 158, 11, 0.6)";
      case "FALSE POSITIVE":
        return "0 0 20px rgba(239, 68, 68, 0.6)";
      default:
        return "0 0 15px rgba(255, 255, 255, 0.3)";
    }
  };

  const getStarColor = (star: StarData) => {
    const disposition = star.classification?.disposition;
    switch (disposition) {
      case "CONFIRMED":
        return "#10b981";
      case "CANDIDATE":
        return "#f59e0b";
      case "FALSE POSITIVE":
        return "#ef4444";
      default:
        return "#ffffff";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-space-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/60">Loading real NASA data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-dark relative overflow-hidden">
      {/* Space Background */}
      <div className="absolute inset-0 bg-space-gradient">
        {/* Animated background stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
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
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Pick a Star
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Click on any star to analyze with our AI models
          </p>
        </motion.div>

        {/* Interactive Star Field */}
        <div
          ref={containerRef}
          className="relative w-full h-[60vh] min-h-[400px] mx-auto"
        >
          {stars.map((star, index) => {
            // Position stars in a scattered pattern for 6 stars
            const angle = (index / stars.length) * 2 * Math.PI;
            const radius = 120 + (index % 2) * 80; // Vary radius for more natural look
            const x = 50 + (Math.cos(angle) * radius) / 8; // Convert to percentage
            const y = 50 + (Math.sin(angle) * radius) / 8;

            return (
              <motion.div
                key={star.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                onClick={() => handleStarClick(star)}
              >
                <div className="relative">
                  {/* Selection Ring - Surrounds the star */}
                  {selectedStar?.id === star.id && (
                    <div
                      className="absolute rounded-full border-2 border-white"
                      style={{
                        width: `${getStarSize(star) + 12}px`,
                        height: `${getStarSize(star) + 12}px`,
                        left: "-6px",
                        top: "-6px",
                        opacity: 0.9,
                      }}
                    />
                  )}

                  {/* The actual star */}
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: `${getStarSize(star)}px`,
                      height: `${getStarSize(star)}px`,
                      backgroundColor: getStarColor(star),
                      boxShadow: getStarGlow(star),
                    }}
                  />
                </div>

                {/* Enhanced Star Label */}
                <motion.div
                  className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10"
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={{
                    opacity: hoveredStar?.id === star.id ? 1 : 0,
                    y: hoveredStar?.id === star.id ? 0 : -10,
                    scale: hoveredStar?.id === star.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg border border-white/20 shadow-lg">
                    <div className="font-semibold">{star.name}</div>
                    <div className="text-xs text-white/70 mt-1">
                      {star.physical.period.toFixed(1)}d •{" "}
                      {star.physical.prad.toFixed(1)}R⊕
                    </div>
                    <div
                      className="text-xs font-medium mt-1"
                      style={{ color: getStarColor(star) }}
                    >
                      {star.classification?.disposition}
                    </div>
                  </div>
                  {/* Arrow pointing to star */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-blue-900/90"></div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Star Info */}
        {selectedStar && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-2">
                {selectedStar.name}
              </h3>
              <p className="text-sm text-white/60 mb-4">{selectedStar.id}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Period:</span>
                  <span className="text-white ml-2">
                    {selectedStar.physical.period.toFixed(2)} days
                  </span>
                </div>
                <div>
                  <span className="text-white/60">Radius:</span>
                  <span className="text-white ml-2">
                    {selectedStar.physical.prad.toFixed(2)} R⊕
                  </span>
                </div>
                <div>
                  <span className="text-white/60">Mission:</span>
                  <span className="text-white ml-2">
                    {selectedStar.mission}
                  </span>
                </div>
                <div>
                  <span className="text-white/60">Magnitude:</span>
                  <span className="ml-2 text-white">
                    {selectedStar.physical.mag.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={onAnalyze}
                className="mt-6 px-8 py-3 text-lg font-semibold"
              >
                Analyze {selectedStar.name}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
