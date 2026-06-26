import { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';
import { colors } from '@/src/constants/colors';

type Props = PropsWithChildren<{ style?: ViewStyle }>; 

export function Card({ children, style }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.white,
          borderRadius: 18,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
