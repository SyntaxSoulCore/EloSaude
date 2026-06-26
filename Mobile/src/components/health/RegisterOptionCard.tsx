import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { Card } from '@/src/components/ui/Card';
import { IconBox } from '@/src/components/ui/IconBox';
import { colors } from '@/src/constants/colors';

export function RegisterOptionCard({ title, icon, onPress }: { title: string; icon: keyof typeof Ionicons.glyphMap; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card style={{ borderRadius: 16, minHeight: 64, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <IconBox name={icon} bg={colors.softBlue} color={colors.primary} />
          <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: colors.textPrimary }}>{title}</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.slate} />
        </View>
      </Card>
    </Pressable>
  );
}
