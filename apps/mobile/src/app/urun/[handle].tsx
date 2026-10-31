import { Stack, useLocalSearchParams } from 'expo-router';

import { StateView } from '@/components/state-view';
import { ProductDetail } from '@/features/catalog/components/product-detail';
import { useProduct } from '@/features/catalog/hooks';
import { toAppError } from '@/lib/errors';
import { parseHandle } from '@/lib/route-params';

export default function ProductScreen() {
  const handle = parseHandle(useLocalSearchParams<{ handle: string }>().handle);
  const { product, region } = useProduct(handle ?? '');
  const error = region.error ?? product.error;

  let content;
  if (!handle || product.data === null) {
    content = <StateView kind="message" title="Ürün bulunamadı" />;
  } else if (error) {
    content = (
      <StateView
        kind="message"
        title="Ürün yüklenemedi"
        description={toAppError(error).message}
        onRetry={() => (region.error ? region.refetch() : product.refetch())}
      />
    );
  } else if (!product.data) {
    content = <StateView kind="loading" />;
  } else {
    content = <ProductDetail product={product.data} />;
  }

  return (
    <>
      <Stack.Screen options={{ title: product.data?.title ?? '' }} />
      {content}
    </>
  );
}
