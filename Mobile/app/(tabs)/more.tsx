import { Alert, Text, View } from 'react-native';
import { AppHeader } from '@/src/components/layout/AppHeader';
import { Screen } from '@/src/components/layout/Screen';
import { MenuItem } from '@/src/components/health/MenuItem';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';

const items = [
  { title: 'Meus dados', icon: 'person' },
  { title: 'Relatórios de saúde', icon: 'document-text' },
  { title: 'Metas de saúde', icon: 'flag' },
  { title: 'Compartilhar dados', icon: 'share-social' },
  { title: 'Perguntas frequentes', icon: 'help-circle' },
  { title: 'Fale conosco', icon: 'chatbubble' },
  { title: 'Configurações', icon: 'settings' },
  { title: 'Sobre o Cuidar+', icon: 'information-circle' },
] as const;

export default function MoreScreen() {
  return (
    <>
      <AppHeader title="Mais" />
      <Screen scroll>
        <Card style={{ marginTop: 16, paddingVertical: 0 }}>
          {items.map((item) => (
            <MenuItem key={item.title} title={item.title} icon={item.icon} onPress={() => Alert.alert(item.title, 'Em breve.')} />
          ))}
        </Card>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Button title="Sair da conta" variant="dangerOutline" />
        </View>
      </Screen>
    </>
  );
}
