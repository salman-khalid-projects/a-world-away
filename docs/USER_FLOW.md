# User Flow Documentation

## Overview

The application now features a seamless three-screen user flow designed to create an engaging experience for discovering and analyzing exoplanets.

## Flow Screens

### 1. Hero Section

**Purpose**: Landing page to capture user interest and start the journey

**Features**:

- Full-screen background video with space theme
- Animated fallback background with floating particles
- Compelling headline: "Discover Exoplanets in the Cosmos"
- Call-to-action button: "Start Your Journey"
- Responsive design for all screen sizes

**User Actions**:

- Click "Start Your Journey" to proceed to star picker

### 2. Star Picker

**Purpose**: Interactive star selection with visual and manual options

**Features**:

- Interactive star field with clickable stars
- Real star data with names, IDs, and magnitudes
- Hover effects showing star information
- Manual target ID input option
- Visual selection indicators
- Animated space background with floating particles

**User Actions**:

- Click on any star to select it
- Use "Manual Input" to enter a specific target ID
- Click "Analyze Star" to proceed to analysis

**Available Stars**:

- HD 209458 (TIC 307210830) - Mag 7.65
- Kepler-10 - Mag 10.96
- K2-3 (EPIC 201367065) - Mag 12.17
- TOI-700 (TIC 261136679) - Mag 13.1
- TOI-715 (TIC 142748283) - Mag 12.5
- TOI-1696 (TIC 172370679) - Mag 11.8

### 3. Analysis Screen

**Purpose**: Complete analysis interface with results and visualizations

**Features**:

- Back navigation to star picker
- Full analysis form with dataset selection
- Overview statistics display
- Tabbed interface for different analysis views
- All existing analysis functionality

**User Actions**:

- Use "Back to Star Picker" to return to star selection
- Switch between analysis tabs
- Modify dataset or target ID
- Upload custom light curve data

## Technical Implementation

### State Management

The app uses React state to manage the current screen and user selections:

```tsx
const [currentScreen, setCurrentScreen] = useState<AppScreen>("hero");
const [targetId, setTargetId] = useState<string>("");
const [dataset, setDataset] = useState<string>("TESS");
```

### Screen Transitions

Smooth transitions between screens using Framer Motion:

- Hero → Star Picker: Slide up animation
- Star Picker → Analysis: Slide left animation
- Analysis → Star Picker: Slide right animation

### Responsive Design

All screens are fully responsive with:

- Mobile-first design approach
- Flexible layouts for different screen sizes
- Touch-friendly interactions
- Optimized animations for mobile devices

## Visual Assets

### Background Video

- Location: `/public/videos/space-background.mp4`
- Fallback: Animated particle system
- Format: MP4, optimized for web
- Duration: 30-60 seconds loop

### Star Field

- Procedurally generated star positions
- Real astronomical data for star properties
- Color-coded by magnitude and type
- Interactive hover and selection states

## Future Enhancements

### Potential Improvements

1. **Real-time Data**: Connect to actual astronomical databases
2. **3D Star Field**: Implement WebGL-based 3D star visualization
3. **Sound Effects**: Add ambient space sounds and UI feedback
4. **Tutorial Mode**: Guided tour for first-time users
5. **Favorites**: Save frequently analyzed stars
6. **Search**: Advanced search and filtering for star selection

### Performance Optimizations

1. **Video Optimization**: Multiple quality levels for different devices
2. **Lazy Loading**: Load star data on demand
3. **Caching**: Cache analysis results for better performance
4. **Progressive Enhancement**: Graceful degradation for older browsers

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus indicators for all interactive elements
- Alternative text for visual elements
