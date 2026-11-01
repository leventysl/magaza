import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { MIN_TOUCH_SIZE, radius, spacing, fonts } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme-colors';

import { useCategories } from '../hooks';

/** Ana sayfadaki yatay kategori listesi; kategoriler yüklenemezse sessizce gizlenir. */
export function CategoryChips() {
  const theme = useThemeColors();
  const { data: categories } = useCategories();
  if (!categories?.length) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {categories.map((category) => (
        <Pressable
          key={category.id}
          onPress={() =>
            router.push({ pathname: '/kategori/[handle]', params: { handle: category.handle } })
          }
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.chip,
            {
              borderColor: theme.border,
              backgroundColor: pressed ? theme.border : theme.surface,
            },
          ]}
        >
          <Text style={[styles.label, { color: theme.text }]}>{category.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: spacing.sm, paddingHorizontal: spacing.xs, paddingBottom: spacing.md },
  chip: {
    minHeight: MIN_TOUCH_SIZE,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    justifyContent: 'center',
  },
  label: { ...fonts.medium, fontSize: 15 },
});
