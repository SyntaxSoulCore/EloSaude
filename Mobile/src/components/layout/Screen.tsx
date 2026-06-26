import { PropsWithChildren } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/src/constants/colors';

type Props = PropsWithChildren<{ scroll?: boolean; noPadding?: boolean; lightStatusBar?: boolean }>;

export function Screen({ children, scroll, noPadding, lightStatusBar }: Props) {
  const content = (
    <View style={{ flex: 1, paddingHorizontal: noPadding ? 0 : 20, backgroundColor: colors.background }}>{children}</View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={lightStatusBar ? 'light-content' : 'dark-content'} />
      {scroll ? <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{content}</ScrollView> : content}
    </SafeAreaView>
  );
}
