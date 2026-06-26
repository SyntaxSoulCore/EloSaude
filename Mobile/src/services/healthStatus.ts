import { HealthStatus } from '@/src/types/health';

export const computeBloodPressureStatus = (systolic: number, diastolic: number): HealthStatus => {
  if (systolic < 120 && diastolic < 80) return 'Normal';
  if (systolic <= 139 || diastolic <= 89) return 'Atenção';
  return 'Alto';
};
