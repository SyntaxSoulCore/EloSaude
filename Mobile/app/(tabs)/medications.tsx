import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { MedicationCard } from '@/src/components/health/MedicationCard';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { getMedicationsWithSchedule } from '@/src/database/db';
import { colors } from '@/src/constants/colors';

export default function MedicationsScreen() {
  const medications = getMedicationsWithSchedule();
  const [taken, setTaken] = useState<Record<string, boolean>>({});

  return (
    <>
      <AppHeader title="Medicamentos" />
      <Screen scroll>
        <View style={{ gap: 12, paddingVertical: 16, paddingBottom: 110 }}>
          <Card style={{ backgroundColor: colors.softBlue }}>
            <Text style={{ fontSize: 15, fontWeight: '700' }}>Próximas doses</Text>
            <Text style={{ color: colors.textSecondary }}>2 medicamentos agora</Text>
          </Card>

          {medications.slice(0, 2).map((item) => (
            <MedicationCard key={item.id} name={item.name} dosage={item.dosage} time={item.time ?? '08:00'} taken={!!taken[item.id]} onTake={() => setTaken((prev) => ({ ...prev, [item.id]: true }))} />
          ))}

          <View>
            <Text style={{ fontWeight: '700', marginBottom: 8 }}>Programação do dia</Text>
            {medications.map((item) => (
              <MedicationCard key={`${item.id}-all`} name={item.name} dosage={item.dosage} time={item.time ?? '08:00'} />
            ))}
          </View>
        </View>
      </Screen>
      <View style={{ position: 'absolute', left: 20, right: 20, bottom: 24 }}>
        <Button title="+ Adicionar medicamento" onPress={() => router.push('/medications/new')} />
      </View>
    </>
  );
}
