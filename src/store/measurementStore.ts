import { create } from 'zustand';
import { Annotation, VolumeMeasurement, DistanceMeasurement, AngleMeasurement } from '../types/measurement';

interface MeasurementState {
  annotations: Annotation[];
  volumeMeasurements: VolumeMeasurement[];
  distanceMeasurements: DistanceMeasurement[];
  angleMeasurements: AngleMeasurement[];
  activeMode: 'none' | 'annotation' | 'volume' | 'distance' | 'angle';
  setActiveMode: (mode: 'none' | 'annotation' | 'volume' | 'distance' | 'angle') => void;
  addAnnotation: (annotation: Annotation) => void;
  addVolumeMeasurement: (measurement: VolumeMeasurement) => void;
  addDistanceMeasurement: (measurement: DistanceMeasurement) => void;
  addAngleMeasurement: (measurement: AngleMeasurement) => void;
}

export const useMeasurementStore = create<MeasurementState>((set) => ({
  annotations: [],
  volumeMeasurements: [],
  distanceMeasurements: [],
  angleMeasurements: [],
  activeMode: 'none',
  setActiveMode: (mode) => set({ activeMode: mode }),
  addAnnotation: (annotation) =>
    set((state) => ({ annotations: [...state.annotations, annotation] })),
  addVolumeMeasurement: (measurement) =>
    set((state) => ({ volumeMeasurements: [...state.volumeMeasurements, measurement] })),
  addDistanceMeasurement: (measurement) =>
    set((state) => ({ distanceMeasurements: [...state.distanceMeasurements, measurement] })),
  addAngleMeasurement: (measurement) =>
    set((state) => ({ angleMeasurements: [...state.angleMeasurements, measurement] })),
}));