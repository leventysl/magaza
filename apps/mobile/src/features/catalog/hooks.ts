import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getProductByHandle, getRegionId, listCategories, listProducts, PAGE_SIZE } from './api';

const HOUR_MS = 60 * 60 * 1000;

export const catalogKeys = {
  region: ['region'] as const,
  categories: ['categories'] as const,
  products: (filters: { categoryId?: string; search?: string }) => ['products', filters] as const,
  product: (handle: string) => ['product', handle] as const,
};

export function useRegionId() {
  return useQuery({ queryKey: catalogKeys.region, queryFn: getRegionId, staleTime: HOUR_MS });
}

export function useCategories() {
  return useQuery({
    queryKey: catalogKeys.categories,
    queryFn: listCategories,
    staleTime: HOUR_MS,
  });
}

export function useProducts(filters: { categoryId?: string; search?: string }) {
  const region = useRegionId();
  const regionId = region.data;
  const products = useInfiniteQuery({
    queryKey: catalogKeys.products(filters),
    queryFn: ({ pageParam }) =>
      listProducts({ regionId: regionId!, offset: pageParam, ...filters }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const next = lastPage.offset + PAGE_SIZE;
      return next < lastPage.count ? next : undefined;
    },
    enabled: regionId !== undefined,
  });
  return { products, region };
}

export function useProduct(handle: string) {
  const region = useRegionId();
  const regionId = region.data;
  const product = useQuery({
    queryKey: catalogKeys.product(handle),
    queryFn: () => getProductByHandle(regionId!, handle),
    enabled: regionId !== undefined && handle !== '',
  });
  return { product, region };
}
