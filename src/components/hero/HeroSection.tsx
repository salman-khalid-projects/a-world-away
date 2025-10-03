import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { tokens } from "../../theme/tokens";
import { cn } from "../../utils/cn";

export interface HeroSectionProps {
  onStartJourney: () => void;
}

/**
 * Hero section with background video and call-to-action
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ onStartJourney }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video with muted audio for better UX
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onError={() => {
            // Fallback to animated background if video fails to load
            console.log("Video failed to load, using animated background");
          }}
        >
          <source src="/videos/space-background.mp4" type="video/mp4" />
        </video>
        {/* Fallback animated background */}
        <div className="absolute inset-0 bg-space-gradient">
          {/* Animated particles for visual interest */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.5, 0.5],
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Discover
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-300">
              Exoplanets
            </span>
            <span className="block text-4xl md:text-5xl font-light">
              in the Cosmos
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={cn(
            "text-xl md:text-2xl mb-8 max-w-2xl mx-auto",
            tokens.subtext
          )}
        >
          Journey through the stars and uncover hidden worlds using cutting-edge
          AI analysis. Pick a star, find a transit, and explore the universe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onStartJourney}
            variant="primary"
            size="lg"
            className="text-lg px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 shadow-2xl"
          >
            Start Your Journey
          </Button>

          <div className="flex items-center gap-2 text-sm text-white/60">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span>Powered by AI • TESS & Kepler Data</span>
          </div>
        </motion.div>

        {/* Floating elements for visual interest */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute top-32 right-16 w-1 h-1 bg-cyan-300/50 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-violet-300/40 rounded-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
