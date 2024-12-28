import React from 'react';
import CesiumViewer from './components/CesiumViewer';
import Toolbar from './components/Toolbar';
import MeasurementResults from './components/measurements/MeasurementResults';

function App() {
  return (
    <div className="w-full h-screen relative">
      <CesiumViewer />
      <Toolbar />
      <MeasurementResults />
    </div>
  );
}

export default App;