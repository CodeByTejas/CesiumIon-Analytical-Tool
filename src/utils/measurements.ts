import * as Cesium from 'cesium';

export const calculateDistance = (point1: Cesium.Cartesian3, point2: Cesium.Cartesian3): number => {
  return Cesium.Cartesian3.distance(point1, point2);
};

export const calculateAngle = (vertex: Cesium.Cartesian3, point1: Cesium.Cartesian3, point2: Cesium.Cartesian3): number => {
  const vector1 = Cesium.Cartesian3.subtract(point1, vertex, new Cesium.Cartesian3());
  const vector2 = Cesium.Cartesian3.subtract(point2, vertex, new Cesium.Cartesian3());
  
  Cesium.Cartesian3.normalize(vector1, vector1);
  Cesium.Cartesian3.normalize(vector2, vector2);
  
  return Cesium.Math.toDegrees(Math.acos(Cesium.Cartesian3.dot(vector1, vector2)));
};

export const calculateVolume = (points: Cesium.Cartesian3[]): number => {
  if (points.length < 4) return 0;

  // Convert Cartesian3 to cartographic for better accuracy
  const cartographicPoints = points.map(point => 
    Cesium.Cartographic.fromCartesian(point)
  );

  // Calculate the base area using the first three points
  const baseArea = calculatePolygonArea(cartographicPoints.slice(0, 3));
  
  // Calculate height using the fourth point
  const heightPoint = cartographicPoints[3];
  const baseCenter = calculateBaseCenter(cartographicPoints.slice(0, 3));
  const height = Math.abs(heightPoint.height - baseCenter.height);

  return baseArea * height;
};

const calculatePolygonArea = (points: Cesium.Cartographic[]): number => {
  // Convert to local ENU coordinates for area calculation
  const center = calculateBaseCenter(points);
  const transform = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromRadians(center.longitude, center.latitude, center.height)
  );
  const inverseTransform = Cesium.Matrix4.inverse(transform, new Cesium.Matrix4());

  const localPoints = points.map(point => {
    const cartesian = Cesium.Cartesian3.fromRadians(point.longitude, point.latitude, point.height);
    return Cesium.Matrix4.multiplyByPoint(
      inverseTransform,
      cartesian,
      new Cesium.Cartesian3()
    );
  });

  // Calculate area using the shoelace formula
  let area = 0;
  for (let i = 0; i < localPoints.length; i++) {
    const j = (i + 1) % localPoints.length;
    area += localPoints[i].x * localPoints[j].y - localPoints[j].x * localPoints[i].y;
  }
  return Math.abs(area) / 2;
};

const calculateBaseCenter = (points: Cesium.Cartographic[]): Cesium.Cartographic => {
  const sum = points.reduce((acc, point) => ({
    longitude: acc.longitude + point.longitude,
    latitude: acc.latitude + point.latitude,
    height: acc.height + point.height
  }), { longitude: 0, latitude: 0, height: 0 });

  return new Cesium.Cartographic(
    sum.longitude / points.length,
    sum.latitude / points.length,
    sum.height / points.length
  );
};