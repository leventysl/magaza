import { screen } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';

import RootLayout from '@/app/_layout';
import SearchScreen from '@/app/ara';
import HomeScreen from '@/app/index';
import { queryClient } from '@/lib/query-client';

import { getRegionId, listCategories, listProducts } from '../api';
import { productListSchema } from '../schemas';
import response from './granit-tencere.json';

jest.mock('../api', () => ({
  PAGE_SIZE: 20,
  getRegionId: jest.fn(),
  listCategories: jest.fn(),
  listProducts: jest.fn(),
}));

const routes = { _layout: RootLayout, index: HomeScreen, ara: SearchScreen };
const page = productListSchema.parse(response);
const soldOut = {
  ...page.products[0],
  id: 'prod_sold_out',
  handle: 'dokum-guvec',
  title: 'Döküm Güveç',
  variants: page.products[0].variants!.map((v) => ({ ...v, inventory_quantity: 0 })),
};

beforeAll(() => queryClient.setDefaultOptions({ queries: { retry: false } }));
beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(getRegionId).mockResolvedValue('reg_test');
  jest.mocked(listCategories).mockResolvedValue([
    { id: 'pcat_1', name: 'Tencereler', handle: 'tencereler' },
    { id: 'pcat_2', name: 'Tavalar', handle: 'tavalar' },
  ]);
  jest
    .mocked(listProducts)
    .mockResolvedValue({ ...page, products: [page.products[0], soldOut], count: 2 });
});
afterEach(() => queryClient.clear());

describe('ana sayfa', () => {
  it('kategorileri ve ürünleri fiyat ve stok bilgisiyle gösterir', async () => {
    await renderRouter(routes, { initialUrl: '/' });
    expect(
      await screen.findByRole('button', { name: 'Granit Tencere, ₺649,90 ve üzeri' }),
    ).toBeTruthy();
    expect(
      screen.getByRole('button', { name: 'Döküm Güveç, ₺649,90 ve üzeri, Tükendi' }),
    ).toBeTruthy();
    expect(await screen.findByRole('button', { name: 'Tavalar' })).toBeTruthy();
    expect(screen.getByRole('search', { name: 'Ürün ara' })).toBeTruthy();
    expect(listProducts).toHaveBeenCalledWith(
      expect.objectContaining({ regionId: 'reg_test', offset: 0 }),
    );
  });

  it('ürün yüklenemezse hata mesajı gösterir', async () => {
    jest.mocked(listProducts).mockRejectedValueOnce(new TypeError('Network request failed'));
    await renderRouter(routes, { initialUrl: '/' });
    expect(await screen.findByText('Ürünler yüklenemedi')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Tekrar dene' })).toBeTruthy();
  });
});
