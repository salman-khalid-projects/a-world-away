# Component API Documentation

## UI Components

### Card

A reusable container component for consistent content layout.

```tsx
interface CardProps {
  title?: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
```

**Usage:**

```tsx
<Card title="Analysis Results" subtitle="Transit detection summary">
  <p>Content goes here</p>
</Card>
```

### Stat

Displays key metrics with different visual tones.

```tsx
interface StatProps {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "good" | "warn" | "bad";
  className?: string;
}
```

**Usage:**

```tsx
<Stat label="Confidence" value="86%" hint="classifier score" tone="good" />
```

### Chip

Interactive tag/filter component.

```tsx
interface ChipProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}
```

**Usage:**

```tsx
<Chip active onClick={() => setFilter("active")}>
  Active Filter
</Chip>
```

### Button

Styled button with variants and sizes.

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}
```

**Usage:**

```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Analyze Target
</Button>
```

## Chart Components

### LightCurveChart

Displays light curve data as a line chart.

```tsx
interface LightCurveChartProps {
  data: LightCurveData[];
  title?: string;
  subtitle?: string;
  className?: string;
  color?: string;
  domain?: [number, number];
}
```

**Usage:**

```tsx
<LightCurveChart
  data={lightCurveData}
  title="Raw Light Curve"
  color="#93c5fd"
  domain={[0.96, 1.04]}
/>
```

### PhaseFoldedChart

Shows phase-folded transit data.

```tsx
interface PhaseFoldedChartProps {
  data: PhaseFoldedData[];
  title?: string;
  subtitle?: string;
  className?: string;
  color?: string;
  domain?: [number, number];
}
```

### PeriodogramChart

Displays BLS periodogram with power spectrum.

```tsx
interface PeriodogramChartProps {
  data: PeriodogramData[];
  title?: string;
  subtitle?: string;
  className?: string;
  color?: string;
}
```

### FeatureImportanceChart

Horizontal bar chart for AI feature importance.

```tsx
interface FeatureImportanceChartProps {
  data: FeatureImportance[];
  title?: string;
  subtitle?: string;
  className?: string;
  color?: string;
  domain?: [number, number];
}
```

## Layout Components

### MainLayout

Main application layout wrapper.

```tsx
interface MainLayoutProps {
  children: React.ReactNode;
  judgesMode: boolean;
  onToggleJudgesMode: () => void;
}
```

### Header

Application header with logo and controls.

```tsx
interface HeaderProps {
  judgesMode: boolean;
  onToggleJudgesMode: () => void;
}
```

## Flow Components

### HeroSection

Landing page hero with background video, call-to-action, and interactive scroll functionality.

```tsx
interface HeroSectionProps {
  onStartJourney: () => void;
}
```

**Features:**

- Full-screen background video with fallback animation
- Animated text and floating elements
- Responsive design with mobile optimization
- Smooth entrance animations
- **Interactive scroll functionality** - automatically navigates to star-picker when user scrolls down
- **Visual scroll progress indicator** - shows scroll progress with animated feedback
- **Dynamic scroll indicator text** - changes from "Scroll to explore" to "Keep scrolling..." based on scroll progress

**Scroll Behavior:**

- Triggers navigation when user scrolls down more than 20% of viewport height
- Includes 300ms delay to prevent accidental triggers
- Visual feedback shows scroll progress with animated mouse icon
- Progress indicator fills the scroll icon as user scrolls

**Usage:**

```tsx
<HeroSection onStartJourney={() => setScreen("star-picker")} />
```

### StarPicker

Interactive star selection interface with visual space background.

```tsx
interface StarPickerProps {
  onStarSelect: (starId: string) => void;
  onManualInput: (starId: string) => void;
  onAnalyze: () => void;
  selectedStarId?: string;
}

interface StarData {
  id: string;
  name: string;
  x: number;
  y: number;
  magnitude: number;
  color: string;
  isSelected?: boolean;
}
```

**Features:**

- Interactive star field with clickable stars
- Manual target ID input option
- Real-time star information on hover
- Visual selection indicators
- Animated background with floating particles

**Usage:**

```tsx
<StarPicker
  onStarSelect={handleStarSelect}
  onManualInput={handleManualInput}
  onAnalyze={handleAnalyze}
  selectedStarId={currentTarget}
/>
```

### ScreenTransition

Smooth screen transition wrapper with directional animations.

```tsx
interface ScreenTransitionProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}
```

**Features:**

- Configurable transition directions
- Smooth easing animations
- Customizable duration and timing

**Usage:**

```tsx
<ScreenTransition direction="right">
  <YourComponent />
</ScreenTransition>
```

### PageTransition

Page transition wrapper with AnimatePresence for route changes.

```tsx
interface PageTransitionProps {
  children: React.ReactNode;
  key: string | number;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}
```

**Usage:**

```tsx
<PageTransition key="hero" direction="up">
  <HeroSection />
</PageTransition>
```

## Analysis Components

### AnalysisForm

Target selection and dataset configuration form.

```tsx
interface AnalysisFormProps {
  dataset: string;
  targetId: string;
  onDatasetChange: (dataset: string) => void;
  onTargetIdChange: (targetId: string) => void;
  onAnalyze: () => void;
  onUpload: () => void;
}
```

### OverviewTab

Analysis summary and quality checks.

```tsx
interface OverviewTabProps {
  verdict: AnalysisVerdict;
}
```

### DetectionTab

Complete detection pipeline visualization.

```tsx
interface DetectionTabProps {
  rawLightCurve: LightCurveData[];
  detrended: LightCurveData[];
  periodogram: PeriodogramData[];
  phaseFolded: PhaseFoldedData[];
}
```

### ExplainabilityTab

AI model explanations and sanity checks.

```tsx
interface ExplainabilityTabProps {
  featureImportances: FeatureImportance[];
}
```

### CatalogTab

Target browser with filtering capabilities.

```tsx
interface CatalogTabProps {
  targets: TargetInfo[];
  onTargetSelect: (targetId: string) => void;
}
```

## App Flow States

The application uses a state-based navigation system with three main screens:

### Screen Types

```tsx
type AppScreen = "hero" | "star-picker" | "analysis";
```

### Flow Description

1. **Hero Screen**: Landing page with background video and call-to-action
2. **Star Picker Screen**: Interactive star selection with visual interface
3. **Analysis Screen**: Full analysis interface with tabs and results

### State Management

```tsx
const [currentScreen, setCurrentScreen] = useState<AppScreen>("hero");
const [targetId, setTargetId] = useState<string>("");
const [dataset, setDataset] = useState<string>("TESS");
```

### Navigation Handlers

```tsx
// Start journey from hero to star picker
const handleStartJourney = () => setCurrentScreen("star-picker");

// Select star and proceed to analysis
const handleAnalyze = () => {
  if (targetId) {
    setCurrentScreen("analysis");
    setTab("overview");
  }
};

// Return to star picker from analysis
const handleBackToStarPicker = () => setCurrentScreen("star-picker");
```

## Data Types

### Core Types

```tsx
interface LightCurveData {
  t: number;
  flux: number;
}

interface PhaseFoldedData {
  phase: number;
  flux: number;
}

interface PeriodogramData {
  period: number;
  power: number;
}

interface FeatureImportance {
  name: string;
  value: number;
}

interface AnalysisVerdict {
  label: string;
  confidence: number;
  period: number;
  depthPpm: number;
  durationHr: number;
}

interface TargetInfo {
  id: string;
  mission: "TESS" | "Kepler" | "K2";
  magnitude: number;
  period?: number;
  status: "Candidate" | "Confirmed" | "False Positive";
}
```

## Utility Functions

### Analysis Utils

```tsx
// Format confidence as percentage
formatConfidence(confidence: number): string

// Format period with units
formatPeriod(period: number): string

// Convert ppm to percentage
ppmToPercentage(ppm: number): number

// Get confidence tone for styling
getConfidenceTone(confidence: number): 'good' | 'warn' | 'bad'

// Get status color class
getStatusColor(status: string): string
```

### Demo Data

```tsx
// Generate all demo data
generateDemoData(): {
  rawLightCurve: LightCurveData[];
  detrended: LightCurveData[];
  periodogram: PeriodogramData[];
  phaseFolded: PhaseFoldedData[];
  featureImportances: FeatureImportance[];
  verdict: AnalysisVerdict;
  targets: TargetInfo[];
}
```

## Styling

### Design Tokens

Access design tokens from `src/theme/tokens.ts`:

```tsx
import { tokens } from "../theme/tokens";

// Usage
<div className={tokens.card}>
  <p className={tokens.text}>Content</p>
</div>;
```

### Utility Classes

Use the `cn` utility for conditional classes:

```tsx
import { cn } from "../utils/cn";

<div
  className={cn("base-class", condition && "conditional-class", tokens.card)}
>
  Content
</div>;
```
