import { productListSchema } from '../schemas';
import response from './granit-tencere.json';

describe('productListSchema', () => {
  it('sunucunun gerçek yanıtını kabul eder', () => {
    expect(productListSchema.parse(response).products[0].variants).toHaveLength(6);
  });

  it('http(s) dışındaki görsel adresini reddeder', () => {
    const product = { ...response.products[0], thumbnail: 'javascript:alert(1)' };
    expect(() => productListSchema.parse({ ...response, products: [product] })).toThrow();
  });

  it('negatif fiyatı reddeder', () => {
    const [first, ...rest] = response.products[0].variants;
    const variant = {
      ...first,
      calculated_price: { ...first.calculated_price, calculated_amount: -1 },
    };
    const product = { ...response.products[0], variants: [variant, ...rest] };
    expect(() => productListSchema.parse({ ...response, products: [product] })).toThrow();
  });
});
