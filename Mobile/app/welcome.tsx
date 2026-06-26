import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { Screen } from '@/src/components/layout/Screen';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { colors } from '@/src/constants/colors';

export default function WelcomeScreen() {
  const goIn = async () => {
    await SecureStore.setItemAsync('cuidar-entered', '1');
    router.replace('/(tabs)/home');
  };

  return (
    <Screen scroll>
      <View style={{ flex: 1, justifyContent: 'center', paddingVertical: 20 }}>
        <Card style={{ borderRadius: 24, minHeight: 640, justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center', gap: 8, marginTop: 8 }}>
            <Text style={{ color: colors.primary, fontSize: 30, fontWeight: '700' }}>Cuidar+</Text>
            <Text style={{ color: colors.textSecondary }}>Sua saúde, nosso cuidado.</Text>
          </View>

          <View style={{ alignItems: 'center', gap: 16 }}>
            <Ionicons name="people" size={120} color={colors.primary} />
            <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>Bem-vindo ao Cuidar+</Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center' }}>
              O app que ajuda você a cuidar da sua saúde todos os dias.
            </Text>
          </View>

          <View style={{ gap: 12 }}>
            <Button title="Entrar" onPress={goIn} />
            <Button title="Criar conta" variant="secondary" />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <Ionicons name="shield-checkmark" color={colors.success} size={16} />
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Seus dados estão protegidos</Text>
            </View>
          </View>
        </Card>
      </View>
    </Screen>
  );
}
