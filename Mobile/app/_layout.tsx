import '../global.css';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initializeDatabase } from '@/src/database/db';

export default function RootLayout() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="records/index" />
      <Stack.Screen name="records/blood-pressure" />
      <Stack.Screen name="records/glucose" />
      <Stack.Screen name="records/cholesterol" />
      <Stack.Screen name="records/weight" />
      <Stack.Screen name="records/history" />
      <Stack.Screen name="medications/new" />
      <Stack.Screen name="reminders/index" />
      <Stack.Screen name="tips/index" />
      <Stack.Screen name="profile/index" />
      <Stack.Screen name="settings/index" />
    </Stack>
  );
}
