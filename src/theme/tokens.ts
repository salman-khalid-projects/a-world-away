// Design tokens for consistent styling across the app
export const tokens = {
  // Background colors
  bg: "bg-space-dark",
  bgSoft: "bg-space-soft", 
  card: "bg-space-card/80",
  
  // Borders
  border: "border border-white/10",
  
  // Text colors
  text: "text-white/90",
  subtext: "text-white/60",
  
  // Accent colors
  accent: "text-cyan-300",
  accentBg: "bg-cyan-300/10",
  accentRing: "ring-cyan-300/40",
  highlight: "text-violet-300",
  
  // Interactive states
  hover: "hover:bg-white/10",
  focus: "focus:outline-none focus:ring-2 focus:ring-cyan-300/30",
  
  // Spacing
  spacing: {
    xs: "p-2",
    sm: "p-3", 
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  },
  
  // Border radius
  radius: {
    sm: "rounded-lg",
    md: "rounded-xl", 
    lg: "rounded-2xl",
    xl: "rounded-3xl",
  },
  
  // Shadows
  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg", 
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  },
} as const;

// Chart color schemes
export const chartColors = {
  primary: "#93c5fd",      // Light blue
  secondary: "#a78bfa",    // Light purple  
  success: "#34d399",      // Green
  warning: "#fbbf24",      // Amber
  error: "#f87171",        // Red
  grid: "rgba(255,255,255,0.06)",
  tooltip: {
    background: "#0e1530",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    color: "#fff",
  },
} as const;

