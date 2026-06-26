import { Pressable, Text } from 'react-native';
import { colors } from '@/src/constants/colors';

type Variant = 'primary' | 'secondary' | 'dangerOutline' | 'ghost';

type Props = { title: string; onPress?: () => void; variant?: Variant; disabled?: boolean };

export function Button({ title, onPress, variant = 'primary', disabled }: Props) {
  const map = {
    primary: { bg: colors.primary, border: colors.primary, text: colors.white },
    secondary: { bg: colors.white, border: colors.border, text: colors.textPrimary },
    dangerOutline: { bg: colors.white, border: colors.danger, text: colors.danger },
    ghost: { bg: 'transparent', border: 'transparent', text: colors.primary },
  }[variant];

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        height: 52,
        borderRadius: 12,
        backgroundColor: map.bg,
        borderWidth: 1,
        borderColor: map.border,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <Text style={{ color: map.text, fontSize: 15, fontWeight: '700' }}>{title}</Text>
    </Pressable>
  );
}
