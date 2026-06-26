import * as SecureStore from 'expo-secure-store';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Entry() {
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync('cuidar-entered').then((value) => {
      setTarget(value ? '/(tabs)/home' : '/welcome');
    });
  }, []);

  if (!target) return null;
  return <Redirect href={target as any} />;
}
