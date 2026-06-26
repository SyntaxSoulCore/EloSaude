import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { ReminderToggleCard } from '@/src/components/health/ReminderToggleCard';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { getReminders, setReminderEnabled } from '@/src/database/db';
import { ensureNotificationPermission, scheduleDailyNotification } from '@/src/services/notifications';

export default function RemindersScreen() {
  const base = getReminders();
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(base.map((r) => [r.id, r.enabled === 1]))
  );

  const toggle = async (id: string, title: string, time: string, next: boolean) => {
    setToggles((prev) => ({ ...prev, [id]: next }));
    setReminderEnabled(id, next);
    if (next) {
      const granted = await ensureNotificationPermission();
      if (granted) await scheduleDailyNotification(title, `Lembrete diário às ${time}`, time);
    }
    Alert.alert('Lembrete', next ? 'Lembrete ativado.' : 'Lembrete desativado.');
  };

  return (
    <>
      <AppHeader title="Lembretes" onBack={() => router.back()} />
      <Screen scroll>
        <View style={{ gap: 12, paddingVertical: 16 }}>
          <Card>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>Não se preocupe!</Text>
            <Text>O Cuidar+ te ajuda a não esquecer.</Text>
          </Card>

          <Text style={{ fontWeight: '700' }}>Lembretes ativos</Text>
          {base.map((item) => (
            <ReminderToggleCard
              key={item.id}
              title={item.title}
              subtitle={`Todos os dias — ${item.time}`}
              value={!!toggles[item.id]}
              onValueChange={(next) => toggle(item.id, item.title, item.time, next)}
            />
          ))}
          <Button title="+ Novo lembrete" />
        </View>
      </Screen>
    </>
  );
}
