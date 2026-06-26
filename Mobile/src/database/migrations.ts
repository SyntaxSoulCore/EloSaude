import type { SQLiteDatabase } from 'expo-sqlite';
import { schemaStatements } from './schema';

export const runMigrations = (db: SQLiteDatabase) => {
  schemaStatements.forEach((statement) => db.execSync(statement));

  const medicationScheduleColumns = db.getAllSync<{ name: string }>('PRAGMA table_info(medication_schedules)');
  if (!medicationScheduleColumns.some((c) => c.name === 'notification_id')) {
    db.execSync('ALTER TABLE medication_schedules ADD COLUMN notification_id TEXT');
  }

  const reminderColumns = db.getAllSync<{ name: string }>('PRAGMA table_info(reminders)');
  if (!reminderColumns.some((c) => c.name === 'notification_id')) {
    db.execSync('ALTER TABLE reminders ADD COLUMN notification_id TEXT');
  }
};
