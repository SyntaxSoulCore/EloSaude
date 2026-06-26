import type { ReactNode } from 'react';
import { View } from 'react-native';

export function BottomAction({ children }: { children: ReactNode }) {
  return <View style={{ padding: 20, backgroundColor: '#F1F5F9' }}>{children}</View>;
}
