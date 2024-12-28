export interface Annotation {
  id: string;
  position: Cesium.Cartesian3;
  text: string;
  link?: string;
}

export interface VolumeMeasurement {
  id: string;
  points: Cesium.Cartesian3[];
  volume: number;
}

export interface DistanceMeasurement {
  id: string;
  startPoint: Cesium.Cartesian3;
  endPoint: Cesium.Cartesian3;
  distance: number;
}

export interface AngleMeasurement {
  id: string;
  vertex: Cesium.Cartesian3;
  point1: Cesium.Cartesian3;
  point2: Cesium.Cartesian3;
  angle: number;
}