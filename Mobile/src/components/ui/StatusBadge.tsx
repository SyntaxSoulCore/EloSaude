import { Text, View } from 'react-native';
import { colors } from '@/src/constants/colors';
import type { HealthStatus } from '@/src/types/health';

export function StatusBadge({ status }: { status: HealthStatus }) {
  const palette = {
    Normal: { bg: colors.softGreen, color: colors.success },
    Atenção: { bg: colors.softYellow, color: colors.warning },
    Alto: { bg: colors.softRed, color: colors.danger },
    Baixo: { bg: colors.softBlue, color: colors.slate },
  }[status];

  return (
    <View style={{ backgroundColor: palette.bg, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 }}>
      <Text style={{ color: palette.color, fontSize: 12, fontWeight: '700' }}>{status}</Text>
    </View>
  );
}
