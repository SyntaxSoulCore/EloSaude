import { useState } from 'react';
import { Alert, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { addMedication } from '@/src/database/db';
import { ensureNotificationPermission, scheduleDailyNotification } from '@/src/services/notifications';

export default function NewMedicationScreen() {
  const [name, setName] = useState('Losartana');
  const [dosage, setDosage] = useState('50 mg');
  const [frequency, setFrequency] = useState('1 vez ao dia');
  const [time, setTime] = useState('08:00');
  const [startDate, setStartDate] = useState('24/06/2024');
  const [observation, setObservation] = useState('');

  const save = async () => {
    if (!name.trim()) return Alert.alert('Validação', 'Nome é obrigatório.');
    if (!dosage.trim()) return Alert.alert('Validação', 'Dosagem é obrigatória.');
    if (!time.trim()) return Alert.alert('Validação', 'Informe pelo menos um horário.');

    addMedication({ name, dosage, frequency, time, startDate, observation });

    const granted = await ensureNotificationPermission();
    if (granted) {
      await scheduleDailyNotification(name, `Hora de tomar ${dosage}`, time);
    }

    Alert.alert('Sucesso', 'Medicamento salvo com lembrete.');
    router.back();
  };

  return (
    <>
      <AppHeader title="Novo medicamento" onBack={() => router.back()} />
      <Screen scroll>
        <View style={{ gap: 12, paddingVertical: 16 }}>
          <Input label="Nome do medicamento" value={name} onChangeText={setName} />
          <Input label="Dosagem" value={dosage} onChangeText={setDosage} />
          <Input label="Frequência" value={frequency} onChangeText={setFrequency} />
          <Input label="Horário" value={time} onChangeText={setTime} />
          <Input label="Início do uso" value={startDate} onChangeText={setStartDate} />
          <Input label="Observações (opcional)" value={observation} onChangeText={setObservation} placeholder="Ex: Tomar após o café da manhã" />
          <Button title="Salvar" onPress={save} />
        </View>
      </Screen>
    </>
  );
}
