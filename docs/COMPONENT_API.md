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
  tone?: 'default' | 'good' | 'warn' | 'bad';
  className?: string;
}
```

**Usage:**
```tsx
<Stat 
  label="Confidence" 
  value="86%" 
  hint="classifier score" 
  tone="good" 
/>
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
<Chip active onClick={() => setFilter('active')}>
  Active Filter
</Chip>
```

### Button
Styled button with variants and sizes.

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
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
  mission: 'TESS' | 'Kepler' | 'K2';
  magnitude: number;
  period?: number;
  status: 'Candidate' | 'Confirmed' | 'False Positive';
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
import { tokens } from '../theme/tokens';

// Usage
<div className={tokens.card}>
  <p className={tokens.text}>Content</p>
</div>
```

### Utility Classes
Use the `cn` utility for conditional classes:

```tsx
import { cn } from '../utils/cn';

<div className={cn(
  "base-class",
  condition && "conditional-class",
  tokens.card
)}>
  Content
</div>
```

