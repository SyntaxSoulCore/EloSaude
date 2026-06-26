import { Pressable, Text, View } from 'react-native';
import { colors } from '@/src/constants/colors';

export function SegmentControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: colors.white, borderRadius: 12, padding: 4, borderWidth: 1, borderColor: colors.border }}>
      {options.map((item) => {
        const active = item === value;
        return (
          <Pressable
            key={item}
            onPress={() => onChange(item)}
            style={{
              flex: 1,
              height: 34,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active ? colors.primary : 'transparent',
            }}
          >
            <Text style={{ color: active ? colors.white : colors.textSecondary, fontSize: 12, fontWeight: '700' }}>{item}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
