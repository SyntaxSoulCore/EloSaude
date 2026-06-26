import type { SQLiteDatabase } from 'expo-sqlite';
import { schemaStatements } from './schema';

export const runMigrations = (db: SQLiteDatabase) => {
  schemaStatements.forEach((statement) => db.execSync(statement));
};
