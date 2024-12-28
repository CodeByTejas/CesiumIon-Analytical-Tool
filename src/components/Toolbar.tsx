import React from 'react';
import { 
  MapPin, 
  Box, 
  Ruler, 
  Compass,
  X 
} from 'lucide-react';
import { useMeasurementStore } from '../store/measurementStore';

const Toolbar: React.FC = () => {
  const { activeMode, setActiveMode } = useMeasurementStore();

  const tools = [
    { id: 'annotation', icon: MapPin, label: 'Add Annotation' },
    { id: 'volume', icon: Box, label: 'Measure Volume' },
    { id: 'distance', icon: Ruler, label: 'Measure Distance' },
    { id: 'angle', icon: Compass, label: 'Measure Angle' },
  ];

  return (
    <div className="fixed top-4 left-4 bg-white rounded-lg shadow-lg p-2">
      <div className="flex flex-col space-y-2">
        {tools.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveMode(activeMode === id ? 'none' : id as any)}
            className={`p-2 rounded-lg transition-colors ${
              activeMode === id
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title={label}
          >
            <Icon size={24} />
          </button>
        ))}
        {activeMode !== 'none' && (
          <button
            onClick={() => setActiveMode('none')}
            className="p-2 rounded-lg hover:bg-red-100 text-red-500"
            title="Cancel"
          >
            <X size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;