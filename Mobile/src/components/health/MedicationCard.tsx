import { Text, View } from 'react-native';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { IconBox } from '@/src/components/ui/IconBox';
import { colors } from '@/src/constants/colors';

export function MedicationCard({ name, dosage, time, taken, onTake }: { name: string; dosage: string; time: string; taken?: boolean; onTake?: () => void }) {
  return (
    <Card>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <IconBox name="medical" bg={colors.softBlue} color={colors.primary} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>{name} {dosage}</Text>
          <Text style={{ color: colors.textSecondary }}>{time}</Text>
        </View>
        <View style={{ width: 96 }}>
          <Button title={taken ? 'Tomado' : 'Tomar'} onPress={onTake} variant={taken ? 'secondary' : 'primary'} />
        </View>
      </View>
    </Card>
  );
}
