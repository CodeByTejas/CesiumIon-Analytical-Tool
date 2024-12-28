import React from 'react';
import { Entity, BillboardGraphics } from 'resium';
import * as Cesium from 'cesium';

interface MapMarkerProps {
  position: Cesium.Cartesian3;
  text: string;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, text }) => {
  return (
    <Entity
      position={position}
      description={text}
    >
      <BillboardGraphics
        image="/map-marker.svg"
        verticalOrigin={Cesium.VerticalOrigin.BOTTOM}
        scale={0.8}
        heightReference={Cesium.HeightReference.RELATIVE_TO_GROUND}
        distanceDisplayCondition={new Cesium.DistanceDisplayCondition(0.0, 5.0e7)}
        scaleByDistance={new Cesium.NearFarScalar(1.0e3, 1.0, 1.0e7, 0.3)}
        translucencyByDistance={new Cesium.NearFarScalar(1.0e3, 1.0, 1.0e7, 0.4)}
        pixelOffset={new Cesium.Cartesian2(0, -10)}
      />
    </Entity>
  );
};

export default MapMarker;