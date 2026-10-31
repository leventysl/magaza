import { z } from 'zod';

// Store API yanıtının uygulamanın kullandığı kısmı. Sunucudan gelen veri güvenilmezdir:
// beklenen biçimde değilse ekrana ulaşmadan hata verir. Bilinmeyen alanlar atılır.

const imageSchema = z.object({
  id: z.string(),
  url: z.url({ protocol: /^https?$/ }),
});

const priceSchema = z.object({
  calculated_amount: z.number().nonnegative(),
  original_amount: z.number().nonnegative().nullish(),
  currency_code: z.string().length(3),
});

const variantOptionSchema = z.object({
  option_id: z.string(),
  value: z.string(),
});

export const variantSchema = z.object({
  id: z.string(),
  title: z.string().nullish(),
  manage_inventory: z.boolean().nullish(),
  allow_backorder: z.boolean().nullish(),
  inventory_quantity: z.number().int().nullish(),
  calculated_price: priceSchema.nullish(),
  options: z.array(variantOptionSchema).nullish(),
});

const optionSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const productSchema = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  material: z.string().nullish(),
  thumbnail: z.url({ protocol: /^https?$/ }).nullish(),
  images: z.array(imageSchema).nullish(),
  options: z.array(optionSchema).nullish(),
  variants: z.array(variantSchema).nullish(),
});

export const productListSchema = z.object({
  products: z.array(productSchema),
  count: z.number().int().nonnegative(),
  offset: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  handle: z.string(),
});

export const categoryListSchema = z.object({
  product_categories: z.array(categorySchema),
});

export const regionListSchema = z.object({
  regions: z.array(z.object({ id: z.string(), currency_code: z.string() })),
});

export type Product = z.infer<typeof productSchema>;
export type ProductList = z.infer<typeof productListSchema>;
export type Variant = z.infer<typeof variantSchema>;
export type Category = z.infer<typeof categorySchema>;
