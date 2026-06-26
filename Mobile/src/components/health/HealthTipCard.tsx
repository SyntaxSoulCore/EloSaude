import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { Card } from '@/src/components/ui/Card';
import { IconBox } from '@/src/components/ui/IconBox';

export function HealthTipCard({
  title,
  text,
  icon,
  bg,
}: {
  title: string;
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
}) {
  return (
    <Card style={{ backgroundColor: bg }}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <IconBox name={icon} bg="#fff" color="#2563EB" size={56} />
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={{ fontSize: 15, fontWeight: '700' }}>{title}</Text>
          <Text style={{ fontSize: 14, lineHeight: 20 }}>{text}</Text>
        </View>
      </View>
    </Card>
  );
}
