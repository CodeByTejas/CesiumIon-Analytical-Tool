import React from 'react';
import { Entity, PolylineGraphics } from 'resium';
import * as Cesium from 'cesium';

interface DistanceLineProps {
  startPoint: Cesium.Cartesian3;
  endPoint: Cesium.Cartesian3;
}

const DistanceLine: React.FC<DistanceLineProps> = ({ startPoint, endPoint }) => {
  return (
    <Entity>
      <PolylineGraphics
        positions={[startPoint, endPoint]}
        width={2}
        material={new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.DODGERBLUE,
          dashLength: 16.0,
        })}
      />
    </Entity>
  );
};

export default DistanceLine;