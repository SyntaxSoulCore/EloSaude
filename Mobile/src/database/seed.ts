import type { SQLiteDatabase } from 'expo-sqlite';

const now = new Date().toISOString();

export const seedDatabase = (db: SQLiteDatabase) => {
  const count = db.getFirstSync<{ total: number }>('SELECT COUNT(*) as total FROM user_profile');
  if ((count?.total ?? 0) > 0) return;

  db.execSync(`
    INSERT INTO user_profile (id, name, age, created_at, updated_at)
    VALUES ('user-marcos', 'Marcos', 52, '${now}', '${now}');

    INSERT INTO health_records (id, type, systolic, diastolic, value, unit, status, observation, measured_at, created_at)
    VALUES
      ('bp-1', 'blood_pressure', 130, 80, NULL, 'mmHg', 'Atenção', NULL, '${now}', '${now}'),
      ('glu-1', 'glucose', NULL, NULL, 98, 'mg/dL', 'Normal', 'em jejum', '${now}', '${now}'),
      ('chol-1', 'cholesterol', NULL, NULL, 190, 'mg/dL', 'Atenção', NULL, '${now}', '${now}');

    INSERT INTO medications (id, name, dosage, frequency, start_date, observation, active, created_at, updated_at)
    VALUES
      ('med-1', 'Losartana', '50mg', '1 vez ao dia', '${now}', NULL, 1, '${now}', '${now}'),
      ('med-2', 'Metformina', '850mg', '1 vez ao dia', '${now}', NULL, 1, '${now}', '${now}'),
      ('med-3', 'Sinvastatina', '20mg', '1 vez ao dia', '${now}', NULL, 1, '${now}', '${now}');

    INSERT INTO medication_schedules (id, medication_id, time, enabled, created_at)
    VALUES
      ('sch-1', 'med-1', '08:00', 1, '${now}'),
      ('sch-2', 'med-2', '08:00', 1, '${now}'),
      ('sch-3', 'med-3', '22:00', 1, '${now}');

    INSERT INTO reminders (id, type, title, time, enabled, created_at)
    VALUES
      ('rem-1', 'medication', 'Medicamentos', '08:00', 1, '${now}'),
      ('rem-2', 'blood_pressure', 'Medir pressão', '08:00', 1, '${now}'),
      ('rem-3', 'glucose', 'Medir glicemia', '07:00', 1, '${now}');
  `);
};
