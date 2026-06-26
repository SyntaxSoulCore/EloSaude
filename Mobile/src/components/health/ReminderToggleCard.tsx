import { Switch, Text, View } from 'react-native';
import { Card } from '@/src/components/ui/Card';
import { IconBox } from '@/src/components/ui/IconBox';
import { colors } from '@/src/constants/colors';

export function ReminderToggleCard({ title, subtitle, value, onValueChange }: { title: string; subtitle: string; value: boolean; onValueChange: (next: boolean) => void }) {
  return (
    <Card>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <IconBox name="notifications" bg={colors.softBlue} color={colors.primary} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>{title}</Text>
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{subtitle}</Text>
        </View>
        <Switch value={value} onValueChange={onValueChange} trackColor={{ false: '#CBD5E1', true: colors.success }} thumbColor={colors.white} />
      </View>
    </Card>
  );
}
