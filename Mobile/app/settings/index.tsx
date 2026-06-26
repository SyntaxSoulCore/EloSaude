import { Text, View } from 'react-native';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { Card } from '@/src/components/ui/Card';

export default function SettingsScreen() {
  return (
    <>
      <AppHeader title="Configurações" />
      <Screen>
        <View style={{ paddingTop: 16 }}>
          <Card><Text>Configurações em construção.</Text></Card>
        </View>
      </Screen>
    </>
  );
}
