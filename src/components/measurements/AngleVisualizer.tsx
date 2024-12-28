import React from 'react';
import { Entity, PolylineGraphics } from 'resium';
import * as Cesium from 'cesium';

interface AngleVisualizerProps {
  vertex: Cesium.Cartesian3;
  point1: Cesium.Cartesian3;
  point2: Cesium.Cartesian3;
  angle: number;
}

const AngleVisualizer: React.FC<AngleVisualizerProps> = ({ vertex, point1, point2, angle }) => {
  // Create arc points for visualization
  const createArcPoints = () => {
    const vector1 = Cesium.Cartesian3.subtract(point1, vertex, new Cesium.Cartesian3());
    const vector2 = Cesium.Cartesian3.subtract(point2, vertex, new Cesium.Cartesian3());
    
    Cesium.Cartesian3.normalize(vector1, vector1);
    Cesium.Cartesian3.normalize(vector2, vector2);
    
    const arcPoints = [vertex];
    const segments = 32;
    const angleInRadians = Cesium.Math.toRadians(angle);
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const rotationAngle = angleInRadians * t;
      
      const rotationMatrix = Cesium.Matrix3.fromRotationZ(rotationAngle);
      const rotatedVector = Cesium.Matrix3.multiplyByVector(
        rotationMatrix,
        vector1,
        new Cesium.Cartesian3()
      );
      
      const scaledVector = Cesium.Cartesian3.multiplyByScalar(
        rotatedVector,
        10, // Scale factor for arc radius
        new Cesium.Cartesian3()
      );
      
      const arcPoint = Cesium.Cartesian3.add(
        vertex,
        scaledVector,
        new Cesium.Cartesian3()
      );
      
      arcPoints.push(arcPoint);
    }
    
    return arcPoints;
  };

  return (
    <>
      {/* Lines from vertex to points */}
      <Entity>
        <PolylineGraphics
          positions={[vertex, point1]}
          width={2}
          material={Cesium.Color.YELLOW}
        />
      </Entity>
      <Entity>
        <PolylineGraphics
          positions={[vertex, point2]}
          width={2}
          material={Cesium.Color.YELLOW}
        />
      </Entity>
      
      {/* Arc visualization */}
      <Entity>
        <PolylineGraphics
          positions={createArcPoints()}
          width={2}
          material={Cesium.Color.ORANGE}
        />
      </Entity>
    </>
  );
};

export default AngleVisualizer;