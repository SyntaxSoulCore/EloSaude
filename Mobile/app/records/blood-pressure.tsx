import { useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import { computeBloodPressureStatus } from '@/src/services/healthStatus';
import { insertBloodPressure } from '@/src/database/db';

export default function BloodPressureScreen() {
  const [systolic, setSystolic] = useState('130');
  const [diastolic, setDiastolic] = useState('80');
  const [observation, setObservation] = useState('');

  const status = useMemo(() => {
    const s = Number(systolic || 0);
    const d = Number(diastolic || 0);
    return computeBloodPressureStatus(s, d);
  }, [systolic, diastolic]);

  const save = () => {
    if (!systolic || !diastolic) {
      Alert.alert('Atenção', 'Preencha sistólica e diastólica.');
      return;
    }
    const saved = insertBloodPressure(Number(systolic), Number(diastolic), observation);
    Alert.alert('Sucesso', `Registro salvo com status ${saved}.`);
  };

  return (
    <>
      <AppHeader title="Pressão arterial" onBack={() => router.back()} />
      <Screen scroll>
        <View style={{ gap: 12, paddingVertical: 16 }}>
          <Text>24 de Junho — 08:30</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Input label="Sistólica" value={systolic} onChangeText={setSystolic} keyboardType="number-pad" />
            </View>
            <View style={{ flex: 1 }}>
              <Input label="Diastólica" value={diastolic} onChangeText={setDiastolic} keyboardType="number-pad" />
            </View>
          </View>
          <Card>
            <Text style={{ marginBottom: 8, fontWeight: '700' }}>Situação</Text>
            <StatusBadge status={status} />
          </Card>
          <Input label="Observação (opcional)" value={observation} onChangeText={setObservation} placeholder="Como você está se sentindo?" />
          <Button title="Salvar" onPress={save} />
          <Button title="Ver histórico" variant="secondary" onPress={() => router.push('/records/history')} />
        </View>
      </Screen>
    </>
  );
}
