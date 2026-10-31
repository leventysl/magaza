import type { Product, Variant } from './schemas';

/** Seçenek kimliği → seçilen değer. */
export type Selection = Record<string, string>;

export type ProductOption = {
  id: string;
  title: string;
  values: string[];
};

export type StockStatus = { kind: 'in' } | { kind: 'low'; quantity: number } | { kind: 'out' };

export const LOW_STOCK_THRESHOLD = 3;

/**
 * Ürünün seçenekleri ve bu ürünün varyantlarında gerçekten geçen değerler. Medusa seçenek
 * değerlerini ürünler arasında ortak tutar; bu yüzden değerler varyantlardan türetilir.
 */
export function productOptions(product: Product): ProductOption[] {
  return (product.options ?? [])
    .map((option) => {
      const values: string[] = [];
      for (const variant of product.variants ?? []) {
        const value = variant.options?.find((o) => o.option_id === option.id)?.value;
        if (value !== undefined && !values.includes(value)) values.push(value);
      }
      return { id: option.id, title: option.title, values };
    })
    .filter((option) => option.values.length > 0);
}

function matches(variant: Variant, selection: Selection): boolean {
  return Object.entries(selection).every(([optionId, value]) =>
    variant.options?.some((o) => o.option_id === optionId && o.value === value),
  );
}

/** Seçimin tamamıyla eşleşen varyant; seçim eksikse ya da eşleşme yoksa `undefined`. */
export function findVariant(product: Product, selection: Selection): Variant | undefined {
  const optionCount = productOptions(product).length;
  if (Object.keys(selection).length < optionCount) return undefined;
  return product.variants?.find((variant) => matches(variant, selection));
}

export function stockStatus(variant: Variant): StockStatus {
  if (!variant.manage_inventory || variant.allow_backorder) return { kind: 'in' };
  const quantity = variant.inventory_quantity ?? 0;
  if (quantity <= 0) return { kind: 'out' };
  if (quantity <= LOW_STOCK_THRESHOLD) return { kind: 'low', quantity };
  return { kind: 'in' };
}

export function isPurchasable(variant: Variant): boolean {
  return stockStatus(variant).kind !== 'out' && variant.calculated_price != null;
}

/**
 * Diğer seçimler sabitken bu değeri seçmek satın alınabilir bir varyanta götürüyor mu?
 * Seçenek düğmelerinde tükenmiş kombinasyonları ayırt etmek için kullanılır.
 */
export function isValueAvailable(
  product: Product,
  selection: Selection,
  optionId: string,
  value: string,
): boolean {
  const candidate = { ...selection, [optionId]: value };
  return (product.variants ?? []).some(
    (variant) => matches(variant, candidate) && isPurchasable(variant),
  );
}

/** Açılışta seçili gelen kombinasyon: ilk satın alınabilir varyant, yoksa ilk varyant. */
export function defaultSelection(product: Product): Selection {
  const variants = product.variants ?? [];
  const variant = variants.find(isPurchasable) ?? variants[0];
  if (!variant) return {};
  return Object.fromEntries((variant.options ?? []).map((o) => [o.option_id, o.value]));
}

/** Kartlarda gösterilen en düşük fiyat ve ürünün en az bir varyantının satın alınabilir olup olmadığı. */
export function productSummary(product: Product): {
  minPrice?: { amount: number; currencyCode: string };
  hasMultiplePrices: boolean;
  inStock: boolean;
} {
  const priced = (product.variants ?? []).filter((v) => v.calculated_price != null);
  const amounts = priced.map((v) => v.calculated_price!.calculated_amount);
  const cheapest = priced[amounts.indexOf(Math.min(...amounts))];
  return {
    minPrice: cheapest && {
      amount: cheapest.calculated_price!.calculated_amount,
      currencyCode: cheapest.calculated_price!.currency_code,
    },
    hasMultiplePrices: new Set(amounts).size > 1,
    inStock: (product.variants ?? []).some(isPurchasable),
  };
}
