import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { Card } from '@/src/components/ui/Card';

export default function GlucoseScreen() {
  return (
    <>
      <AppHeader title="Glicemia" onBack={() => router.back()} />
      <Screen>
        <View style={{ paddingTop: 16 }}>
          <Card><Text>Tela de registro de glicemia (placeholder elegante).</Text></Card>
        </View>
      </Screen>
    </>
  );
}
