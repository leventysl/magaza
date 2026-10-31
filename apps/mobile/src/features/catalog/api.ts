import { medusa } from '@/lib/medusa';

import {
  categoryListSchema,
  productListSchema,
  regionListSchema,
  type Category,
  type Product,
  type ProductList,
} from './schemas';

export const PAGE_SIZE = 20;
const STORE_CURRENCY = 'try';

const VARIANT_STOCK_AND_PRICE =
  'variants.id,variants.manage_inventory,variants.allow_backorder,+variants.inventory_quantity,*variants.calculated_price';
const LIST_FIELDS = `id,handle,title,thumbnail,${VARIANT_STOCK_AND_PRICE}`;
const DETAIL_FIELDS =
  'id,handle,title,description,material,thumbnail,*images,*options,' +
  `variants.title,*variants.options,${VARIANT_STOCK_AND_PRICE}`;

/** Fiyatlar bölgeye göre hesaplanır; mağazanın TRY bölgesi, yoksa ilk bölge kullanılır. */
export async function getRegionId(): Promise<string> {
  const { regions } = regionListSchema.parse(
    await medusa.store.region.list({ fields: 'id,currency_code' }),
  );
  const region = regions.find((r) => r.currency_code === STORE_CURRENCY) ?? regions[0];
  if (!region) throw new Error('Mağazada tanımlı bölge yok.');
  return region.id;
}

export async function listCategories(): Promise<Category[]> {
  const response = await medusa.store.category.list({ fields: 'id,name,handle', limit: 50 });
  return categoryListSchema.parse(response).product_categories;
}

export type ProductQuery = {
  regionId: string;
  categoryId?: string;
  search?: string;
  offset: number;
};

export async function listProducts({
  regionId,
  categoryId,
  search,
  offset,
}: ProductQuery): Promise<ProductList> {
  const response = await medusa.store.product.list({
    region_id: regionId,
    fields: LIST_FIELDS,
    limit: PAGE_SIZE,
    offset,
    ...(categoryId ? { category_id: categoryId } : {}),
    ...(search ? { q: search } : {}),
  });
  return productListSchema.parse(response);
}

/** Ürünü kısa adından (handle) getirir; bulunamazsa `null`. */
export async function getProductByHandle(
  regionId: string,
  handle: string,
): Promise<Product | null> {
  const response = await medusa.store.product.list({
    region_id: regionId,
    handle,
    fields: DETAIL_FIELDS,
    limit: 1,
  });
  return productListSchema.parse(response).products[0] ?? null;
}
