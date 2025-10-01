# A World Away - Exoplanet Analysis Frontend

A modern React/TypeScript frontend for exoplanet transit detection and analysis, built for NASA Space Apps 2025.

## 🚀 Features

- **Interactive Analysis**: Search targets, visualize light curves, and run transit detection
- **AI Explainability**: Understand why the model thinks it found a transit
- **Multiple Datasets**: Support for TESS, Kepler, and K2 missions
- **Real-time Charts**: Responsive visualizations using Recharts
- **Modern UI**: Dark theme with smooth animations using Framer Motion
- **Accessible Design**: WCAG AA compliant with keyboard navigation

## 🏗️ Architecture

### Component Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Card.tsx
│   │   ├── Stat.tsx
│   │   ├── Chip.tsx
│   │   ├── Button.tsx
│   │   ├── SectionTitle.tsx
│   │   └── Tabs.tsx
│   ├── charts/          # Chart components
│   │   ├── LightCurveChart.tsx
│   │   ├── PhaseFoldedChart.tsx
│   │   ├── PeriodogramChart.tsx
│   │   └── FeatureImportanceChart.tsx
│   ├── layout/          # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MainLayout.tsx
│   └── analysis/        # Analysis-specific components
│       ├── AnalysisForm.tsx
│       ├── OverviewTab.tsx
│       ├── DetectionTab.tsx
│       ├── ExplainabilityTab.tsx
│       ├── CatalogTab.tsx
│       ├── MethodsTab.tsx
│       └── OverviewStats.tsx
├── data/               # Demo data generators
├── theme/              # Design tokens and styling
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Key Components

#### UI Components

- **Card**: Consistent content containers with optional headers
- **Stat**: Key metrics display with different visual tones
- **Chip**: Interactive tags and filters
- **Button**: Styled button variants (primary, secondary, ghost)
- **Tabs**: Navigation between analysis views

#### Chart Components

- **LightCurveChart**: Raw and detrended light curve visualization
- **PhaseFoldedChart**: Transit signal stacked at best period
- **PeriodogramChart**: BLS periodogram with peak detection
- **FeatureImportanceChart**: AI model feature contributions

#### Analysis Components

- **AnalysisForm**: Target selection and dataset configuration
- **OverviewTab**: Analysis summary and quality checks
- **DetectionTab**: Complete detection pipeline visualization
- **ExplainabilityTab**: AI model explanations and sanity checks
- **CatalogTab**: Target browser with filtering
- **MethodsTab**: Methodology and limitations

## 🎨 Design System

### Design Tokens

The app uses a consistent design token system defined in `src/theme/tokens.ts`:

- **Colors**: Space-themed dark palette with cyan/violet accents
- **Spacing**: Consistent padding and margin scales
- **Typography**: Clear hierarchy with proper contrast ratios
- **Borders**: Subtle borders with opacity for depth
- **Shadows**: Layered shadows for card elevation

### Chart Styling

Charts use a consistent color scheme:

- Primary: Light blue (#93c5fd)
- Secondary: Light purple (#a78bfa)
- Success: Green (#34d399)
- Grid: Subtle white with opacity
- Tooltips: Dark theme with proper contrast

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The app runs on `http://localhost:3000` with hot reload enabled.

## 📊 Demo Data

The app includes synthetic demo data generators for:

- Light curves with transit signals
- BLS periodograms with peaks
- Feature importance rankings
- Sample target catalogs

All data is generated client-side for demonstration purposes.

## 🎯 Usage

1. **Select Target**: Choose a dataset (TESS/Kepler/K2) and enter a target ID
2. **Analyze**: Click "Analyze" to run the detection pipeline
3. **Explore Results**: Navigate through tabs to see different aspects:
   - **Overview**: Summary and quality checks
   - **Detection**: Raw data through periodogram analysis
   - **Explainability**: AI model reasoning
   - **Catalog**: Browse available targets
   - **Methods**: Technical details and limitations

## 🔧 Customization

### Adding New Chart Types

1. Create component in `src/components/charts/`
2. Follow existing patterns for props and styling
3. Export from `src/components/charts/index.ts`

### Extending Analysis Pipeline

1. Add new tab component in `src/components/analysis/`
2. Update tab configuration in `App.tsx`
3. Add corresponding data types in `src/types/`

### Theming

Modify `src/theme/tokens.ts` to update colors, spacing, and other design tokens.

## 📱 Responsive Design

The app is fully responsive with:

- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions
- Optimized chart sizing

## ♿ Accessibility

- WCAG AA compliant contrast ratios
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Semantic HTML structure

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations and transitions
- **Recharts** - Chart library
- **Lucide React** - Icons

## 📄 License

Built for NASA Space Apps 2025 - UI Prototype

