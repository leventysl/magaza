import { Stack, useLocalSearchParams } from 'expo-router';

import { StateView } from '@/components/state-view';
import { ProductGrid } from '@/features/catalog/components/product-grid';
import { useCategories } from '@/features/catalog/hooks';
import { toAppError } from '@/lib/errors';
import { parseHandle } from '@/lib/route-params';

export default function CategoryScreen() {
  const handle = parseHandle(useLocalSearchParams<{ handle: string }>().handle);
  const categories = useCategories();
  const category = categories.data?.find((c) => c.handle === handle);

  let content;
  if (categories.error) {
    content = (
      <StateView
        kind="message"
        title="Kategori yüklenemedi"
        description={toAppError(categories.error).message}
        onRetry={() => categories.refetch()}
      />
    );
  } else if (!categories.data) {
    content = <StateView kind="loading" />;
  } else if (!category) {
    content = <StateView kind="message" title="Kategori bulunamadı" />;
  } else {
    content = <ProductGrid categoryId={category.id} emptyTitle="Bu kategoride ürün yok" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: category?.name ?? 'Kategori' }} />
      {content}
    </>
  );
}
