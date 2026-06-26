import { HealthStatus } from '@/src/types/health';

export const computeBloodPressureStatus = (systolic: number, diastolic: number): HealthStatus => {
  if (systolic < 120 && diastolic < 80) return 'Normal';
  if (systolic < 140 && diastolic < 90) return 'Atenção';
  return 'Alto';
};
