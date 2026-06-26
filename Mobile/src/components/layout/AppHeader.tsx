import { Ionicons } from '@expo/vector-icons';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@/src/constants/colors';

type Props = {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  greeting?: string;
};

export function AppHeader({ title, subtitle, onBack, rightIcon, onRightPress, greeting }: Props) {
  return (
    <View style={{ backgroundColor: colors.primary, minHeight: greeting ? 104 : 88, paddingHorizontal: 20, justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {onBack ? (
          <Pressable onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </Pressable>
        ) : (
          <View style={{ width: 24 }} />
        )}
        <View style={{ flex: 1, alignItems: greeting ? 'flex-start' : 'center' }}>
          {greeting ? <Text style={{ color: colors.white, fontSize: 24, fontWeight: '700' }}>{greeting}</Text> : null}
          {title ? <Text style={{ color: colors.white, fontSize: 18, fontWeight: '700' }}>{title}</Text> : null}
          {subtitle ? <Text style={{ color: '#DBEAFE', fontSize: 12 }}>{subtitle}</Text> : null}
        </View>
        {rightIcon ? (
          <Pressable onPress={onRightPress}>
            <Ionicons name={rightIcon} size={22} color={colors.white} />
          </Pressable>
        ) : (
          <View style={{ width: 24 }} />
        )}
      </View>
    </View>
  );
}
