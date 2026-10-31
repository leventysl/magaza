import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MIN_TOUCH_SIZE, radius, spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme-colors';

import type { Product } from '../schemas';
import { isValueAvailable, type ProductOption, type Selection } from '../variants';

type Props = {
  product: Product;
  option: ProductOption;
  selection: Selection;
  onSelect: (optionId: string, value: string) => void;
};

/**
 * Bir seçeneğin değer düğmeleri. Diğer seçimlerle birlikte tükenmiş değerler üstü çizili
 * görünür ama seçilebilir kalır; kullanıcı neyin tükendiğini görebilsin.
 */
export function OptionSelector({ product, option, selection, onSelect }: Props) {
  const theme = useThemeColors();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>{option.title}</Text>
      <View style={styles.values} accessibilityRole="radiogroup" accessibilityLabel={option.title}>
        {option.values.map((value) => {
          const selected = selection[option.id] === value;
          const available = isValueAvailable(product, selection, option.id, value);
          return (
            <Pressable
              key={value}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={available ? value : `${value}, tükendi`}
              onPress={() => onSelect(option.id, value)}
              style={[
                styles.value,
                {
                  borderColor: selected ? theme.primary : theme.border,
                  backgroundColor: selected ? theme.primary : theme.surface,
                },
              ]}
            >
              <Text
                style={[
                  styles.valueText,
                  { color: selected ? theme.onPrimary : available ? theme.text : theme.muted },
                  !available && styles.unavailable,
                ]}
              >
                {value}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  title: { fontSize: 15, fontWeight: '600' },
  values: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  value: {
    minHeight: MIN_TOUCH_SIZE,
    minWidth: MIN_TOUCH_SIZE,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: { fontSize: 15, fontWeight: '500' },
  unavailable: { textDecorationLine: 'line-through' },
});
