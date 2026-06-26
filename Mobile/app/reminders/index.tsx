import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { ReminderToggleCard } from '@/src/components/health/ReminderToggleCard';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { getReminders, setReminderEnabled } from '@/src/database/db';
import { cancelNotification, ensureNotificationPermission, scheduleDailyNotification } from '@/src/services/notifications';
import type { Reminder } from '@/src/types/health';

export default function RemindersScreen() {
  const [reminders, setReminders] = useState<Reminder[]>(getReminders());

  const toggle = async (item: Reminder, next: boolean) => {
    if (next) {
      const granted = await ensureNotificationPermission();
      if (!granted) {
        Alert.alert('Lembrete', 'Permissão de notificação não concedida.');
        return;
      }

      const notificationId = await scheduleDailyNotification(item.title, `Lembrete diário às ${item.time}`, item.time);
      setReminderEnabled(item.id, true, notificationId);
      setReminders((prev) =>
        prev.map((reminder) =>
          reminder.id === item.id ? { ...reminder, enabled: 1, notification_id: notificationId } : reminder
        )
      );
      Alert.alert('Lembrete', 'Lembrete ativado.');
      return;
    }

    if (item.notification_id) {
      await cancelNotification(item.notification_id);
    }

    setReminderEnabled(item.id, false, null);
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === item.id ? { ...reminder, enabled: 0, notification_id: null } : reminder
      )
    );
    Alert.alert('Lembrete', 'Lembrete desativado.');
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
          {reminders.map((item) => (
            <ReminderToggleCard
              key={item.id}
              title={item.title}
              subtitle={`Todos os dias — ${item.time}`}
              value={item.enabled === 1}
              onValueChange={(next) => toggle(item, next)}
            />
          ))}
          <Button title="+ Novo lembrete" />
        </View>
      </Screen>
    </>
  );
}
