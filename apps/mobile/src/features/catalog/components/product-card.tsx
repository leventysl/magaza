import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ProductImage } from '@/components/product-image';
import { radius, spacing, fonts } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme-colors';

import { formatPrice } from '../money';
import type { Product } from '../schemas';
import { productSummary } from '../variants';

export function ProductCard({ product }: { product: Product }) {
  const theme = useThemeColors();
  const { minPrice, hasMultiplePrices, inStock } = productSummary(product);
  const price = minPrice ? formatPrice(minPrice.amount, minPrice.currencyCode) : undefined;
  const priceLabel = price && (hasMultiplePrices ? `${price} ve üzeri` : price);
  const a11yLabel = [product.title, priceLabel, inStock ? undefined : 'Tükendi']
    .filter(Boolean)
    .join(', ');

  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: '/urun/[handle]', params: { handle: product.handle } })
      }
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <ProductImage uri={product.thumbnail} label={product.title} style={styles.image} />
      <View style={styles.body}>
        <Text numberOfLines={2} style={[styles.title, { color: theme.text }]}>
          {product.title}
        </Text>
        {priceLabel ? (
          <Text style={[styles.price, { color: theme.text }]}>{priceLabel}</Text>
        ) : null}
        {!inStock ? <Text style={[styles.soldOut, { color: theme.danger }]}>Tükendi</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.xs,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  image: { aspectRatio: 1 },
  body: { padding: spacing.md, gap: spacing.xs },
  title: { ...fonts.medium, fontSize: 15 },
  price: { ...fonts.bold, fontSize: 15 },
  soldOut: { ...fonts.semibold, fontSize: 13 },
});
