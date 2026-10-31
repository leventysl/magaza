import { FlashList } from '@shopify/flash-list';
import type { ReactElement } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native';

import { StateView } from '@/components/state-view';
import { spacing } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { toAppError } from '@/lib/errors';

import { useProducts } from '../hooks';
import { ProductCard } from './product-card';

type Props = {
  categoryId?: string;
  search?: string;
  emptyTitle: string;
  header?: ReactElement;
};

/** İki sütunlu ürün ızgarası: kaydırdıkça sayfa yükler, aşağı çekince yeniler. */
export function ProductGrid({ categoryId, search, emptyTitle, header }: Props) {
  const theme = useThemeColors();
  const { products, region } = useProducts({ categoryId, search });
  const error = region.error ?? products.error;

  if (error) {
    const { message } = toAppError(error);
    const retry = () => (region.error ? region.refetch() : products.refetch());
    return (
      <StateView kind="message" title="Ürünler yüklenemedi" description={message} onRetry={retry} />
    );
  }
  if (!products.data) return <StateView kind="loading" />;

  const items = products.data.pages.flatMap((page) => page.products);
  return (
    <FlashList
      data={items}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      contentContainerStyle={styles.content}
      ListHeaderComponent={header}
      ListEmptyComponent={<StateView kind="message" title={emptyTitle} />}
      ListFooterComponent={
        products.isFetchingNextPage ? (
          <View style={styles.footer}>
            <ActivityIndicator color={theme.primary} />
          </View>
        ) : null
      }
      onEndReached={() => {
        if (products.hasNextPage && !products.isFetchingNextPage) products.fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={products.isRefetching && !products.isFetchingNextPage}
          onRefresh={() => {
            products.refetch();
          }}
          tintColor={theme.primary}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.sm },
  footer: { padding: spacing.lg },
});
