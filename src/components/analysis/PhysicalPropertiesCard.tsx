import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { StarData } from "../../types";

interface PhysicalPropertiesCardProps {
  star: StarData;
}

export const PhysicalPropertiesCard: React.FC<PhysicalPropertiesCardProps> = ({
  star,
}) => {
  const { physical } = star;

  const properties = [
    {
      label: "Orbital Period",
      value: `${physical.period.toFixed(2)} days`,
      description: "Time for one complete orbit",
      icon: "⏱️",
    },
    {
      label: "Transit Duration",
      value: `${physical.duration.toFixed(2)} hours`,
      description: "Duration of transit event",
      icon: "⏳",
    },
    {
      label: "Planet Radius",
      value: `${physical.prad.toFixed(2)} R⊕`,
      description: "Radius relative to Earth",
      icon: "🌍",
    },
    {
      label: "Stellar Temperature",
      value: `${physical.teff.toFixed(0)} K`,
      description: "Effective temperature of host star",
      icon: "☀️",
    },
    {
      label: "Surface Gravity",
      value: `${physical.logg.toFixed(2)} (log g)`,
      description: "Stellar surface gravity",
      icon: "⚖️",
    },
    {
      label: "Stellar Radius",
      value: `${physical.srad.toFixed(2)} R☉`,
      description: "Radius relative to Sun",
      icon: "⭐",
    },
    {
      label: "Apparent Magnitude",
      value: `${physical.mag.toFixed(2)} mag`,
      description: "Brightness as seen from Earth",
      icon: "✨",
    },
    {
      label: "Radius Ratio",
      value: `${physical.radius_ratio.toFixed(2)}`,
      description: "Planet-to-star radius ratio",
      icon: "📏",
    },
    {
      label: "Orbital Density",
      value: `${physical.orbital_density.toFixed(3)}`,
      description: "Planet density per orbital period",
      icon: "🌌",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
            📊
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Physical Properties
            </h2>
            <p className="text-white/60 text-sm">Real data for {star.name}</p>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.map((prop, index) => (
            <motion.div
              key={prop.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
              className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{prop.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-white/70 truncate">
                      {prop.label}
                    </h3>
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">
                    {prop.value}
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between text-white/60">
              <span>Star ID:</span>
              <span className="text-white font-mono">{star.id}</span>
            </div>
            <div className="flex items-center justify-between text-white/60">
              <span>Mission:</span>
              <span className="text-white">{star.mission}</span>
            </div>
            <div className="flex items-center justify-between text-white/60">
              <span>Discovery Date:</span>
              <span className="text-white">{star.discovery_date}</span>
            </div>
            <div className="flex items-center justify-between text-white/60">
              <span>Last Updated:</span>
              <span className="text-white">{star.last_updated}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
