import { formatPrice } from '../money';

describe('formatPrice', () => {
  it('Türk lirasını yerel biçimde gösterir', () => {
    expect(formatPrice(1299.9, 'try')).toBe('₺1.299,90');
    expect(formatPrice(449.9, 'TRY')).toBe('₺449,90');
  });

  it('diğer para birimlerini de biçimlendirir', () => {
    expect(formatPrice(10, 'eur')).toBe('€10,00');
  });
});
