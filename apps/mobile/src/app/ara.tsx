import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { StateView } from '@/components/state-view';
import { MIN_TOUCH_SIZE, radius, spacing } from '@/constants/theme';
import { ProductGrid } from '@/features/catalog/components/product-grid';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useThemeColors } from '@/hooks/use-theme-colors';

const SEARCH_DELAY_MS = 350;
const MIN_QUERY_LENGTH = 2;
const MAX_QUERY_LENGTH = 100;

export default function SearchScreen() {
  const theme = useThemeColors();
  const [text, setText] = useState('');
  const query = useDebouncedValue(text.trim(), SEARCH_DELAY_MS);

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus
        value={text}
        onChangeText={setText}
        maxLength={MAX_QUERY_LENGTH}
        placeholder="Tencere, tava ara…"
        placeholderTextColor={theme.muted}
        returnKeyType="search"
        accessibilityLabel="Ürün ara"
        style={[
          styles.input,
          { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text },
        ]}
      />
      {query.length < MIN_QUERY_LENGTH ? (
        <StateView kind="message" title="Ne aramıştınız?" description="En az 2 harf yazın." />
      ) : (
        <ProductGrid key={query} search={query} emptyTitle={`“${query}” için sonuç bulunamadı`} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    minHeight: MIN_TOUCH_SIZE,
    margin: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
  },
});
