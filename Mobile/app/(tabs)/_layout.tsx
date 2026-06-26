import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { colors } from '@/src/constants/colors';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { height: 72, paddingBottom: 10, paddingTop: 8, backgroundColor: colors.white },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: 'Início', tabBarIcon: ({ color }) => <Ionicons name="home" size={20} color={color} /> }}
      />
      <Tabs.Screen
        name="records"
        options={{ title: 'Registro', tabBarIcon: ({ color }) => <Ionicons name="list" size={20} color={color} /> }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarButton: () => (
            <Pressable onPress={() => router.push('/records')} style={{ marginTop: -24, alignItems: 'center' }}>
              <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', elevation: 4 }}>
                <Ionicons name="add" size={30} color={colors.white} />
              </View>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="medications"
        options={{ title: 'Medicamentos', tabBarIcon: ({ color }) => <Ionicons name="medical" size={20} color={color} /> }}
      />
      <Tabs.Screen
        name="more"
        options={{ title: 'Mais', tabBarIcon: ({ color }) => <Ionicons name="grid" size={20} color={color} /> }}
      />
    </Tabs>
  );
}
