import React from 'react';
import { useMeasurementStore } from '../../store/measurementStore';

const MeasurementResults: React.FC = () => {
  const { 
    distanceMeasurements, 
    angleMeasurements, 
    volumeMeasurements 
  } = useMeasurementStore();

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md">
      {distanceMeasurements.length > 0 && (
        <div className="mb-4">
          <h3 className="font-bold text-lg">Distances</h3>
          {distanceMeasurements.map(m => (
            <div key={m.id} className="text-sm">
              Distance: {m.distance.toFixed(2)} meters
            </div>
          ))}
        </div>
      )}

      {angleMeasurements.length > 0 && (
        <div className="mb-4">
          <h3 className="font-bold text-lg">Angles</h3>
          {angleMeasurements.map(m => (
            <div key={m.id} className="text-sm">
              Angle: {m.angle.toFixed(2)}°
            </div>
          ))}
        </div>
      )}

      {volumeMeasurements.length > 0 && (
        <div>
          <h3 className="font-bold text-lg">Volumes</h3>
          {volumeMeasurements.map(m => (
            <div key={m.id} className="text-sm">
              Volume: {m.volume.toFixed(2)} cubic meters
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeasurementResults;