import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { SegmentControl } from '@/src/components/ui/SegmentControl';
import { HealthTipCard } from '@/src/components/health/HealthTipCard';
import { Button } from '@/src/components/ui/Button';
import { colors } from '@/src/constants/colors';

const filters = ['Todas', 'Diabetes', 'Pressão', 'Colesterol'] as const;

export default function TipsScreen() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('Todas');

  return (
    <>
      <AppHeader title="Dicas de saúde" onBack={() => router.back()} />
      <Screen scroll>
        <View style={{ gap: 12, paddingVertical: 16 }}>
          <SegmentControl options={[...filters]} value={filter} onChange={setFilter} />
          <HealthTipCard title="Alimentação saudável" text="Prefira alimentos naturais, frutas, verduras e grãos integrais." icon="leaf" bg={colors.softGreen} />
          <HealthTipCard title="Atividade física" text="Caminhadas diárias de 30 minutos fazem toda a diferença." icon="walk" bg={colors.softBlue} />
          <HealthTipCard title="Controle o estresse" text="Técnicas de respiração e lazer ajudam sua saúde e mente." icon="happy" bg={colors.softYellow} />
          <Button title="Ver todas as dicas" variant="secondary" />
        </View>
      </Screen>
    </>
  );
}
