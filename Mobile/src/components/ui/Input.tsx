import { TextInput, Text, View, TextInputProps } from 'react-native';
import { colors } from '@/src/constants/colors';

export function Input({ label, ...props }: TextInputProps & { label: string }) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ color: colors.textSecondary, fontSize: 14, fontWeight: '600' }}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.textMuted}
        {...props}
        style={{
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          height: 52,
          paddingHorizontal: 14,
          fontSize: 14,
          color: colors.textPrimary,
        }}
      />
    </View>
  );
}
