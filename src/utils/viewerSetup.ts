import * as Cesium from 'cesium';

export const setupTerrainAndCamera = (viewer: Cesium.Viewer) => {
  // Set up terrain
  viewer.scene.setTerrain(
    new Cesium.Terrain(
      Cesium.CesiumTerrainProvider.fromIonAssetId(1)
    )
  );

  // Set initial camera position
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-100.0, 40.0, 10000000.0),
    orientation: {
      heading: 0.0,
      pitch: -Cesium.Math.PI_OVER_TWO,
      roll: 0.0
    }
  });
};