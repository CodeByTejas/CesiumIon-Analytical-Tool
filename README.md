# CesiumJS 3D Analytics Tool
![Demo Pic 1](public/demopic1.png)
![Demo Pic 2](public/demopic2.png)
A powerful React application built with CesiumJS for 3D geospatial analytics, featuring measurement tools, annotations, and interactive analysis capabilities.

## Features

- **3D Visualization**: Powered by CesiumJS for high-performance 3D globe rendering
- **Measurement Tools**:
  - Distance measurement between points
  - Volume calculation for 3D spaces
  - Angle measurement between surfaces
- **Annotation System**: Add and manage annotations on 3D models
- **Interactive UI**: User-friendly interface with tool selection and real-time measurements

## Prerequisites

- Node.js (v14 or higher)
- npm (v11.0.0 or higher)
- A Cesium ion access token (provided in the project)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cesium-3d-analytics
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/           # React components
│   ├── CesiumViewer.tsx # Main CesiumJS viewer component
│   ├── Toolbar.tsx      # Tools selection interface
│   └── measurements/    # Measurement-related components
├── store/               # State management
│   └── measurementStore.ts
├── types/               # TypeScript type definitions
│   └── measurement.ts
├── utils/               # Utility functions
│   ├── measurements.ts  # Measurement calculations
│   └── viewerSetup.ts  # CesiumJS viewer configuration
└── App.tsx             # Root component
```

## Component Details

### CesiumViewer (`src/components/CesiumViewer.tsx`)
- Main component that initializes the CesiumJS viewer
- Handles terrain setup and initial camera positioning
- Integrates with measurement tools and annotations

### Toolbar (`src/components/Toolbar.tsx`)
- Provides UI for selecting different measurement tools
- Tools include:
  - Annotation placement
  - Volume measurement
  - Distance measurement
  - Angle measurement
- Uses Lucide React icons for tool representation

### MeasurementLayer (`src/components/measurements/MeasurementLayer.tsx`)
- Handles all measurement interactions
- Manages point collection for different measurement types
- Calculates and displays measurement results

### MeasurementResults (`src/components/measurements/MeasurementResults.tsx`)
- Displays active measurements
- Shows results for:
  - Distance measurements
  - Angle measurements
  - Volume calculations

## State Management

The application uses Zustand for state management (`src/store/measurementStore.ts`):
- Manages active measurement mode
- Stores measurement results
- Handles tool selection state

## Utility Functions

### Measurements (`src/utils/measurements.ts`)
- `calculateDistance`: Computes 3D distance between points
- `calculateAngle`: Determines angle between three points
- `calculateVolume`: Estimates volume of 3D spaces
- `calculatePolygonArea`: Helper function for volume calculations

### Viewer Setup (`src/utils/viewerSetup.ts`)
- Configures CesiumJS terrain provider
- Sets up initial camera position and orientation

## Usage Guide

1. **Starting a Measurement**:
   - Select a measurement tool from the toolbar
   - Click on the 3D scene to place points
   - Results appear automatically in the measurement panel

2. **Adding Annotations**:
   - Select the annotation tool
   - Click on the location to annotate
   - Add text or links to the annotation

3. **Volume Measurement**:
   - Select volume tool
   - Place four points to define the space
   - Volume is calculated automatically

4. **Distance Measurement**:
   - Select distance tool
   - Click two points
   - Distance is displayed in meters

5. **Angle Measurement**:
   - Select angle tool
   - Place three points (vertex and two points)
   - Angle is shown in degrees

## Development

### Building for Production
```bash
npm run build
```

### Running Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

## Technologies Used

- React 18
- TypeScript
- CesiumJS/Resium
- Zustand (State Management)
- TailwindCSS (Styling)
- Vite (Build Tool)

## License

[MIT License](LICENSE)
