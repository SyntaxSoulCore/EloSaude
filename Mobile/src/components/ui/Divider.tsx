import { View } from 'react-native';
import { colors } from '@/src/constants/colors';

export function Divider() {
  return <View style={{ height: 1, backgroundColor: colors.border }} />;
}
