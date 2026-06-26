import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@/src/constants/colors';

export function MenuItem({ icon, title, onPress }: { icon: keyof typeof Ionicons.glyphMap; title: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', minHeight: 52, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <Ionicons name={icon} size={20} color={colors.slate} />
      <Text style={{ flex: 1, marginLeft: 12, color: colors.textPrimary, fontSize: 14 }}>{title}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}
