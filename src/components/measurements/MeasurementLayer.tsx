import React, { useEffect, useState } from 'react';
import * as Cesium from 'cesium';
import { Entity } from 'resium';
import { useMeasurementStore } from '../../store/measurementStore';
import { calculateDistance, calculateAngle, calculateVolume } from '../../utils/measurements';
import DistanceLine from './DistanceLine';
import MapMarker from '../annotations/MapMarker';
import VolumeVisualizer from './VolumeVisualizer';
import AngleVisualizer from './AngleVisualizer';

interface MeasurementLayerProps {
  viewer: Cesium.Viewer | null;
  activeMode: string;
}

const MeasurementLayer: React.FC<MeasurementLayerProps> = ({ viewer, activeMode }) => {
  const [measurementPoints, setMeasurementPoints] = useState<Cesium.Cartesian3[]>([]);
  const { 
    addDistanceMeasurement, 
    addAngleMeasurement, 
    addVolumeMeasurement,
    distanceMeasurements,
    volumeMeasurements,
    angleMeasurements,
    annotations 
  } = useMeasurementStore();

  useEffect(() => {
    if (!viewer) return;

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    handler.setInputAction((click: any) => {
      const cartesian = viewer.scene.pickPosition(click.position);
      if (!cartesian) return;

      setMeasurementPoints(prev => [...prev, cartesian]);

      switch (activeMode) {
        case 'distance':
          if (measurementPoints.length === 1) {
            addDistanceMeasurement({
              id: crypto.randomUUID(),
              startPoint: measurementPoints[0],
              endPoint: cartesian,
              distance: calculateDistance(measurementPoints[0], cartesian)
            });
            setMeasurementPoints([]);
          }
          break;

        case 'angle':
          if (measurementPoints.length === 2) {
            const angle = calculateAngle(measurementPoints[0], measurementPoints[1], cartesian);
            addAngleMeasurement({
              id: crypto.randomUUID(),
              vertex: measurementPoints[0],
              point1: measurementPoints[1],
              point2: cartesian,
              angle
            });
            setMeasurementPoints([]);
          }
          break;

        case 'volume':
          if (measurementPoints.length === 3) {
            const allPoints = [...measurementPoints, cartesian];
            addVolumeMeasurement({
              id: crypto.randomUUID(),
              points: allPoints,
              volume: calculateVolume(allPoints)
            });
            setMeasurementPoints([]);
          }
          break;
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      handler.destroy();
    };
  }, [viewer, activeMode, measurementPoints]);

  return (
    <>
      {/* Render distance measurements */}
      {distanceMeasurements.map((measurement) => (
        <DistanceLine
          key={measurement.id}
          startPoint={measurement.startPoint}
          endPoint={measurement.endPoint}
        />
      ))}

      {/* Render angle measurements */}
      {angleMeasurements.map((measurement) => (
        <AngleVisualizer
          key={measurement.id}
          vertex={measurement.vertex}
          point1={measurement.point1}
          point2={measurement.point2}
          angle={measurement.angle}
        />
      ))}

      {/* Render volume measurements */}
      {volumeMeasurements.map((measurement) => (
        <VolumeVisualizer
          key={measurement.id}
          points={measurement.points}
        />
      ))}

      {/* Render annotations */}
      {annotations.map((annotation) => (
        <MapMarker
          key={annotation.id}
          position={annotation.position}
          text={annotation.text}
        />
      ))}

      {/* Render temporary measurement points */}
      {measurementPoints.map((point, index) => (
        <Entity
          key={index}
          position={point}
          point={{ pixelSize: 10, color: Cesium.Color.RED }}
        />
      ))}
    </>
  );
};

export default MeasurementLayer;