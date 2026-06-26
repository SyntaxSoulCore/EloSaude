import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { MetricCard } from '@/src/components/health/MetricCard';
import { Card } from '@/src/components/ui/Card';
import { getDashboardMetrics, getMedicationsWithSchedule, getUserName } from '@/src/database/db';
import { colors } from '@/src/constants/colors';

export default function HomeScreen() {
  const metrics = getDashboardMetrics();
  const meds = getMedicationsWithSchedule();
  const user = getUserName();

  return (
    <>
      <AppHeader greeting={`Olá, ${user}!`} rightIcon="notifications" />
      <Screen scroll>
        <View style={{ gap: 12, paddingVertical: 16 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>Resumo de hoje</Text>
            <Text style={{ color: colors.textSecondary }}>{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}</Text>
          </View>

          <MetricCard title="Pressão arterial" value={`${metrics[0]?.systolic ?? 130} / ${metrics[0]?.diastolic ?? 80}`} unit="mmHg" status={(metrics[0]?.status as any) ?? 'Normal'} icon="heart" bg={colors.softBlue} onPress={() => router.push('/records/blood-pressure')} />
          <MetricCard title="Glicemia" value={`${metrics[1]?.value ?? 98}`} unit="mg/dL" status={(metrics[1]?.status as any) ?? 'Normal'} subtitle="em jejum" icon="water" bg={colors.softGreen} />
          <MetricCard title="Colesterol total" value={`${metrics[2]?.value ?? 190}`} unit="mg/dL" status={(metrics[2]?.status as any) ?? 'Atenção'} icon="flame" bg={colors.softYellow} />

          <Card style={{ backgroundColor: colors.softBlue }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>Medicamentos de hoje</Text>
            <Text style={{ color: colors.textSecondary }}>{Math.min(meds.length, 2)} para tomar</Text>
          </Card>
        </View>
      </Screen>
    </>
  );
}
