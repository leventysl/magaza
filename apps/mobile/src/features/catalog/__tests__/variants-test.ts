import { productListSchema, type Product } from '../schemas';
import {
  defaultSelection,
  findVariant,
  isValueAvailable,
  productOptions,
  productSummary,
  stockStatus,
} from '../variants';
import response from './granit-tencere.json';

const product: Product = productListSchema.parse(response).products[0];
const optionId = (title: string) => product.options!.find((o) => o.title === title)!.id;
const SIZE = optionId('Ölçü');
const COLOR = optionId('Renk');

describe('productOptions', () => {
  it('yalnızca bu ürünün varyantlarında geçen değerleri verir', () => {
    const options = productOptions(product);
    expect(options.find((o) => o.id === SIZE)?.values).toEqual(['18 cm', '20 cm', '24 cm']);
    expect(options.find((o) => o.id === COLOR)?.values).toEqual(['Siyah', 'Bordo']);
  });
});

describe('findVariant', () => {
  it('tam seçimle eşleşen varyantı bulur', () => {
    const variant = findVariant(product, { [SIZE]: '20 cm', [COLOR]: 'Bordo' });
    expect(variant?.title).toBe('20 cm / Bordo');
    expect(variant?.calculated_price?.calculated_amount).toBe(749.9);
  });

  it('eksik seçimde varyant döndürmez', () => {
    expect(findVariant(product, { [SIZE]: '20 cm' })).toBeUndefined();
  });
});

describe('stockStatus', () => {
  it('stok durumunu tükendi / az kaldı / var olarak ayırır', () => {
    const at = (size: string, color: string) =>
      stockStatus(findVariant(product, { [SIZE]: size, [COLOR]: color })!);
    expect(at('24 cm', 'Bordo')).toEqual({ kind: 'out' });
    expect(at('20 cm', 'Bordo')).toEqual({ kind: 'low', quantity: 2 });
    expect(at('18 cm', 'Siyah')).toEqual({ kind: 'in' });
  });

  it('stok takibi kapalı ya da ön siparişe açık varyantı stokta sayar', () => {
    const base = { id: 'v', inventory_quantity: 0 };
    expect(stockStatus({ ...base, manage_inventory: false })).toEqual({ kind: 'in' });
    expect(stockStatus({ ...base, manage_inventory: true, allow_backorder: true })).toEqual({
      kind: 'in',
    });
  });
});

describe('isValueAvailable', () => {
  it('diğer seçim sabitken tükenmiş kombinasyonu ayırt eder', () => {
    expect(isValueAvailable(product, { [COLOR]: 'Bordo' }, SIZE, '24 cm')).toBe(false);
    expect(isValueAvailable(product, { [COLOR]: 'Siyah' }, SIZE, '24 cm')).toBe(true);
  });
});

describe('defaultSelection', () => {
  it('ilk satın alınabilir varyantın seçeneklerini seçer', () => {
    expect(defaultSelection(product)).toEqual({ [SIZE]: '18 cm', [COLOR]: 'Siyah' });
  });

  it('hiç satın alınabilir varyant yoksa ilk varyantı seçer', () => {
    const soldOut: Product = {
      ...product,
      variants: product.variants!.map((v) => ({ ...v, inventory_quantity: 0 })),
    };
    expect(defaultSelection(soldOut)).toEqual({ [SIZE]: '18 cm', [COLOR]: 'Siyah' });
  });
});

describe('productSummary', () => {
  it('en düşük fiyatı ve fiyat aralığını bildirir', () => {
    expect(productSummary(product)).toEqual({
      minPrice: { amount: 649.9, currencyCode: 'try' },
      hasMultiplePrices: true,
      inStock: true,
    });
  });

  it('tüm varyantlar tükendiyse stokta değil der', () => {
    const soldOut: Product = {
      ...product,
      variants: product.variants!.map((v) => ({ ...v, inventory_quantity: 0 })),
    };
    expect(productSummary(soldOut).inStock).toBe(false);
  });

  it('fiyatı olmayan üründe fiyat göstermez', () => {
    expect(productSummary({ ...product, variants: [] })).toEqual({
      minPrice: undefined,
      hasMultiplePrices: false,
      inStock: false,
    });
  });
});
