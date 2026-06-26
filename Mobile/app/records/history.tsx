import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { SegmentControl } from '@/src/components/ui/SegmentControl';
import { HistoryChart } from '@/src/components/health/HistoryChart';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { getBloodPressureHistory } from '@/src/database/db';
import { formatPtDateTime } from '@/src/services/date';

const periods = ['7 dias', '30 dias', '90 dias'] as const;
const types = ['Pressão', 'Glicemia', 'Colesterol'] as const;

export default function HistoryScreen() {
  const [period, setPeriod] = useState<(typeof periods)[number]>('7 dias');
  const [type, setType] = useState<(typeof types)[number]>('Pressão');
  const days = Number(period.split(' ')[0]);
  const records = getBloodPressureHistory(days);

  const points = useMemo(
    () => records.map((r) => ({ systolic: r.systolic ?? 120, diastolic: r.diastolic ?? 80 })),
    [records]
  );

  const latest = records[records.length - 1];

  return (
    <>
      <AppHeader title="Histórico" onBack={() => router.back()} />
      <Screen scroll>
        <View style={{ gap: 12, paddingVertical: 16 }}>
          <SegmentControl options={[...types]} value={type} onChange={setType} />
          <SegmentControl options={[...periods]} value={period} onChange={setPeriod} />
          <HistoryChart points={points.length ? points : [{ systolic: 130, diastolic: 80 }]} />
          <Card>
            <Text style={{ fontWeight: '700' }}>Último registro</Text>
            <Text style={{ fontSize: 22, fontWeight: '700' }}>{latest?.systolic ?? 130} / {latest?.diastolic ?? 80} mmHg</Text>
            <Text>{latest ? formatPtDateTime(latest.measured_at) : '24/06 — 08:30'}</Text>
            <Text>{latest?.status ?? 'Normal'}</Text>
          </Card>
          <Button title="Ver todos os registros" variant="secondary" />
        </View>
      </Screen>
    </>
  );
}
