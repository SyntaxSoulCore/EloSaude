import { openDatabaseSync } from 'expo-sqlite';
import { runMigrations } from './migrations';
import { seedDatabase } from './seed';
import { computeBloodPressureStatus } from '@/src/services/healthStatus';
import type { HealthRecord, Medication, Reminder } from '@/src/types/health';

const db = openDatabaseSync('cuidar-plus.db');

export const initializeDatabase = () => {
  runMigrations(db);
  seedDatabase(db);
};

export const getUserName = () => {
  const row = db.getFirstSync<{ name: string }>('SELECT name FROM user_profile LIMIT 1');
  return row?.name ?? 'Marcos';
};

export const getDashboardMetrics = () =>
  db.getAllSync<HealthRecord>(
    `SELECT *
     FROM health_records hr
     WHERE hr.type IN ('blood_pressure', 'glucose', 'cholesterol')
       AND hr.measured_at = (SELECT MAX(measured_at) FROM health_records WHERE type = hr.type)
     ORDER BY CASE hr.type
       WHEN 'blood_pressure' THEN 1
       WHEN 'glucose' THEN 2
       WHEN 'cholesterol' THEN 3
     END`
  );

export const getLatestBloodPressure = () => {
  return db.getFirstSync<HealthRecord>(
    `SELECT * FROM health_records WHERE type='blood_pressure' ORDER BY measured_at DESC LIMIT 1`
  );
};

export const insertBloodPressure = (systolic: number, diastolic: number, observation?: string) => {
  const now = new Date().toISOString();
  const id = `bp-${Date.now()}`;
  const status = computeBloodPressureStatus(systolic, diastolic);
  db.runSync(
    `INSERT INTO health_records (id, type, systolic, diastolic, value, unit, status, observation, measured_at, created_at)
     VALUES (?, 'blood_pressure', ?, ?, NULL, 'mmHg', ?, ?, ?, ?)`,
    [id, systolic, diastolic, status, observation ?? null, now, now]
  );
  return status;
};

export const getBloodPressureHistory = (days: number) => {
  return db.getAllSync<HealthRecord>(
    `SELECT * FROM health_records
     WHERE type='blood_pressure' AND measured_at >= datetime('now', ?)
     ORDER BY measured_at ASC`,
    [`-${days} day`]
  );
};

export const getMedicationsWithSchedule = () => {
  return db.getAllSync<Medication & { time: string }>(
    `SELECT m.*, s.time
     FROM medications m
     LEFT JOIN medication_schedules s ON s.medication_id = m.id
     WHERE m.active = 1
     ORDER BY s.time ASC`
  );
};

export const addMedication = (payload: {
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  notificationId?: string | null;
  startDate?: string;
  observation?: string;
}) => {
  const now = new Date().toISOString();
  const id = `med-${Date.now()}`;
  db.runSync(
    `INSERT INTO medications (id, name, dosage, frequency, start_date, observation, active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)`,
    [id, payload.name, payload.dosage, payload.frequency, payload.startDate ?? now, payload.observation ?? null, now, now]
  );
  db.runSync(
    `INSERT INTO medication_schedules (id, medication_id, time, enabled, notification_id, created_at)
      VALUES (?, ?, ?, 1, ?, ?)`,
    [`sch-${Date.now()}`, id, payload.time, payload.notificationId ?? null, now]
  );
};

export const getReminders = () =>
  db.getAllSync<Reminder>('SELECT * FROM reminders ORDER BY time ASC');

export const setReminderEnabled = (id: string, enabled: boolean, notificationId: string | null) => {
  db.runSync('UPDATE reminders SET enabled=?, notification_id=? WHERE id=?', [enabled ? 1 : 0, notificationId, id]);
};

export default db;
