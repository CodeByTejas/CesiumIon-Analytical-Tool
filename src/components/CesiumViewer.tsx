import React, { useEffect, useRef } from 'react';
import { Viewer } from 'resium';
import * as Cesium from 'cesium';
import { useMeasurementStore } from '../store/measurementStore';
import MeasurementLayer from './measurements/MeasurementLayer';
import { setupTerrainAndCamera } from '../utils/viewerSetup';

const CesiumViewer: React.FC = () => {
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const { activeMode } = useMeasurementStore();

  useEffect(() => {
    if (viewerRef.current) {
      Cesium.Ion.defaultAccessToken = 'EnternYourToken';
      setupTerrainAndCamera(viewerRef.current);
    }
  }, []);

  return (
    <Viewer
      ref={(ref) => {
        if (ref?.cesiumElement) {
          viewerRef.current = ref.cesiumElement;
        }
      }}
      full
      timeline={false}
      animation={false}
    >
      <MeasurementLayer viewer={viewerRef.current} activeMode={activeMode} />
    </Viewer>
  );
};

export default CesiumViewer;
