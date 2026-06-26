import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export function IconBox({ name, bg, color, size = 40 }: { name: keyof typeof Ionicons.glyphMap; bg: string; color: string; size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name={name} size={20} color={color} />
    </View>
  );
}
