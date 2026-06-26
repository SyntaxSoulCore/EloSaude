import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { Card } from '@/src/components/ui/Card';
import { IconBox } from '@/src/components/ui/IconBox';
import { StatusBadge } from '@/src/components/ui/StatusBadge';
import { colors } from '@/src/constants/colors';
import type { HealthStatus } from '@/src/types/health';

export function MetricCard({
  title,
  value,
  unit,
  status,
  subtitle,
  icon,
  bg,
  onPress,
}: {
  title: string;
  value: string;
  unit: string;
  status: HealthStatus;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <Card style={{ backgroundColor: bg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <IconBox name={icon} bg={colors.white} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>{title}</Text>
            <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>{value} <Text style={{ fontSize: 13 }}>{unit}</Text></Text>
            {subtitle ? <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{subtitle}</Text> : null}
          </View>
          <View style={{ alignItems: 'flex-end', gap: 8 }}>
            <StatusBadge status={status} />
            <Ionicons name="chevron-forward" size={18} color={colors.slate} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
