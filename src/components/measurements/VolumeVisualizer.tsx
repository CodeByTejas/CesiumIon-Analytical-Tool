import React from 'react';
import { Entity, PolygonGraphics, PolylineGraphics } from 'resium';
import * as Cesium from 'cesium';

interface VolumeVisualizerProps {
  points: Cesium.Cartesian3[];
}

const VolumeVisualizer: React.FC<VolumeVisualizerProps> = ({ points }) => {
  if (points.length < 4) return null;

  const basePoints = points.slice(0, 3);
  const heightPoint = points[3];

  // Create vertical lines from base points to the height level
  const createVerticalLines = () => {
    return basePoints.map(basePoint => {
      const baseCartographic = Cesium.Cartographic.fromCartesian(basePoint);
      const heightCartographic = Cesium.Cartographic.fromCartesian(heightPoint);
      
      // Create a point at the same lat/lon as the base point but at the height point's elevation
      const topPoint = Cesium.Cartesian3.fromRadians(
        baseCartographic.longitude,
        baseCartographic.latitude,
        heightCartographic.height
      );
      
      return [basePoint, topPoint];
    });
  };

  // Create the top triangle points
  const topPoints = basePoints.map(point => {
    const cartographic = Cesium.Cartographic.fromCartesian(point);
    const heightCartographic = Cesium.Cartographic.fromCartesian(heightPoint);
    return Cesium.Cartesian3.fromRadians(
      cartographic.longitude,
      cartographic.latitude,
      heightCartographic.height
    );
  });

  return (
    <>
      {/* Base triangle */}
      <Entity>
        <PolygonGraphics
          hierarchy={new Cesium.PolygonHierarchy(basePoints)}
          material={Cesium.Color.BLUE.withAlpha(0.3)}
          outline={true}
          outlineColor={Cesium.Color.WHITE}
        />
      </Entity>

      {/* Top triangle */}
      <Entity>
        <PolygonGraphics
          hierarchy={new Cesium.PolygonHierarchy(topPoints)}
          material={Cesium.Color.BLUE.withAlpha(0.3)}
          outline={true}
          outlineColor={Cesium.Color.WHITE}
        />
      </Entity>

      {/* Vertical lines */}
      {createVerticalLines().map((line, index) => (
        <Entity key={index}>
          <PolylineGraphics
            positions={line}
            width={2}
            material={Cesium.Color.RED}
          />
        </Entity>
      ))}
    </>
  );
};

export default VolumeVisualizer;