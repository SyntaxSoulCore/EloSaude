import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { RegisterOptionCard } from '@/src/components/health/RegisterOptionCard';
import { Card } from '@/src/components/ui/Card';
import { colors } from '@/src/constants/colors';

export default function NewRecordScreen() {
  return (
    <>
      <AppHeader title="Novo registro" onBack={() => router.back()} />
      <Screen scroll>
        <View style={{ gap: 12, paddingVertical: 16 }}>
          <Text style={{ color: colors.textSecondary }}>O que deseja registrar?</Text>
          <RegisterOptionCard title="Pressão arterial" icon="heart" onPress={() => router.push('/records/blood-pressure')} />
          <RegisterOptionCard title="Glicemia" icon="water" onPress={() => router.push('/records/glucose')} />
          <RegisterOptionCard title="Colesterol" icon="flame" onPress={() => router.push('/records/cholesterol')} />
          <RegisterOptionCard title="Peso" icon="barbell" onPress={() => router.push('/records/weight')} />
          <Card style={{ backgroundColor: colors.softBlue }}>
            <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>Dica: Registre seus dados sempre no mesmo horário para melhores resultados.</Text>
          </Card>
        </View>
      </Screen>
    </>
  );
}
