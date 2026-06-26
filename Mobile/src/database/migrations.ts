import type { SQLiteDatabase } from 'expo-sqlite';
import { schemaStatements } from './schema';

export const runMigrations = (db: SQLiteDatabase) => {
  schemaStatements.forEach((statement) => db.execSync(statement));

  // Add notification_id column to medication_schedules if it doesn't exist (migration for existing DBs)
  const cols = db.getAllSync<{ name: string }>("PRAGMA table_info(medication_schedules)");
  if (!cols.some((c) => c.name === 'notification_id')) {
    db.execSync('ALTER TABLE medication_schedules ADD COLUMN notification_id TEXT');
  }
};
