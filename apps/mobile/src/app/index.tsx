import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { MIN_TOUCH_SIZE, radius, spacing, fonts } from '@/constants/theme';
import { CategoryChips } from '@/features/catalog/components/category-chips';
import { ProductGrid } from '@/features/catalog/components/product-grid';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function HomeScreen() {
  const theme = useThemeColors();
  const header = (
    <View style={styles.header}>
      <Pressable
        onPress={() => router.push('/ara')}
        accessibilityRole="search"
        accessibilityLabel="Ürün ara"
        style={[styles.search, { backgroundColor: theme.surface, borderColor: theme.border }]}
      >
        <Text style={[styles.searchText, { color: theme.muted }]}>🔍 Tencere, tava ara…</Text>
      </Pressable>
      <CategoryChips />
    </View>
  );
  return <ProductGrid header={header} emptyTitle="Henüz ürün yok" />;
}

const styles = StyleSheet.create({
  header: { gap: spacing.md, paddingHorizontal: spacing.xs, paddingTop: spacing.sm },
  search: {
    minHeight: MIN_TOUCH_SIZE,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  searchText: { ...fonts.regular, fontSize: 16 },
});
