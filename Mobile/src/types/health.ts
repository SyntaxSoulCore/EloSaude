export type HealthRecordType = 'blood_pressure' | 'glucose' | 'cholesterol' | 'weight';

export type HealthStatus = 'Normal' | 'Atenção' | 'Alto' | 'Baixo';

export type HealthRecord = {
  id: string;
  type: HealthRecordType;
  systolic?: number | null;
  diastolic?: number | null;
  value?: number | null;
  unit?: string | null;
  status: HealthStatus;
  observation?: string | null;
  measured_at: string;
  created_at: string;
};

export type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  start_date?: string | null;
  observation?: string | null;
  active: number;
  created_at: string;
  updated_at: string;
};

export type Reminder = {
  id: string;
  type: string;
  title: string;
  time: string;
  enabled: number;
  created_at: string;
};
