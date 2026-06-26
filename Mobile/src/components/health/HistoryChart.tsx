import { Text, View } from 'react-native';
import Svg, { Line, Polyline } from 'react-native-svg';
import { Card } from '@/src/components/ui/Card';
import { colors } from '@/src/constants/colors';

export function HistoryChart({ points }: { points: { systolic: number; diastolic: number }[] }) {
  const width = 300;
  const height = 160;
  const pad = 20;
  const normalizeY = (v: number) => height - pad - ((v - 60) / 100) * (height - pad * 2);
  const x = (i: number) => pad + (i * (width - pad * 2)) / Math.max(points.length - 1, 1);

  const systolic = points.map((p, i) => `${x(i)},${normalizeY(p.systolic)}`).join(' ');
  const diastolic = points.map((p, i) => `${x(i)},${normalizeY(p.diastolic)}`).join(' ');

  return (
    <Card>
      <Svg width={width} height={height}>
        <Line x1={pad} y1={20} x2={pad} y2={height - pad} stroke="#CBD5E1" strokeWidth={1} />
        <Line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#CBD5E1" strokeWidth={1} />
        <Polyline points={systolic} stroke={colors.primary} strokeWidth={3} fill="none" />
        <Polyline points={diastolic} stroke={colors.success} strokeWidth={3} fill="none" />
      </Svg>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Text style={{ color: colors.primary, fontWeight: '700' }}>Sistólica</Text>
        <Text style={{ color: colors.success, fontWeight: '700' }}>Diastólica</Text>
      </View>
    </Card>
  );
}
