import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { ProductImage } from '@/components/product-image';
import { spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme-colors';

import { formatPrice } from '../money';
import type { Product } from '../schemas';
import {
  defaultSelection,
  findVariant,
  productOptions,
  stockStatus,
  type Selection,
} from '../variants';
import { OptionSelector } from './option-selector';
import { StockBadge } from './stock-badge';

export function ProductDetail({ product }: { product: Product }) {
  const theme = useThemeColors();
  const { width } = useWindowDimensions();
  const [selection, setSelection] = useState<Selection>(() => defaultSelection(product));
  const options = productOptions(product);
  const variant = findVariant(product, selection);
  const price = variant?.calculated_price;
  const images = product.images?.length
    ? product.images
    : [{ id: 'thumbnail', url: product.thumbnail }];

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={(image) => image.id}
        renderItem={({ item }) => (
          <ProductImage uri={item.url} label={product.title} style={{ width, height: width }} />
        )}
      />
      <View style={styles.body}>
        <Text accessibilityRole="header" style={[styles.title, { color: theme.text }]}>
          {product.title}
        </Text>
        {price ? (
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: theme.text }]}>
              {formatPrice(price.calculated_amount, price.currency_code)}
            </Text>
            {price.original_amount != null && price.original_amount > price.calculated_amount ? (
              <Text style={[styles.originalPrice, { color: theme.muted }]}>
                {formatPrice(price.original_amount, price.currency_code)}
              </Text>
            ) : null}
          </View>
        ) : null}
        {variant ? (
          <StockBadge status={stockStatus(variant)} />
        ) : (
          <Text style={[styles.meta, { color: theme.muted }]}>Bu seçim mevcut değil.</Text>
        )}
        {options.map((option) => (
          <OptionSelector
            key={option.id}
            product={product}
            option={option}
            selection={selection}
            onSelect={(optionId, value) => setSelection((s) => ({ ...s, [optionId]: value }))}
          />
        ))}
        {product.description ? (
          <Text style={[styles.description, { color: theme.text }]}>{product.description}</Text>
        ) : null}
        {product.material ? (
          <Text style={[styles.meta, { color: theme.muted }]}>Malzeme: {product.material}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: spacing.xl },
  body: { padding: spacing.lg, gap: spacing.lg },
  title: { fontSize: 22, fontWeight: '700' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  price: { fontSize: 22, fontWeight: '700' },
  originalPrice: { fontSize: 16, textDecorationLine: 'line-through' },
  description: { fontSize: 16, lineHeight: 23 },
  meta: { fontSize: 14 },
});
