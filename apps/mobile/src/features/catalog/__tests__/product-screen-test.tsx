import { fireEvent, screen } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';

import RootLayout from '@/app/_layout';
import SearchScreen from '@/app/ara';
import HomeScreen from '@/app/index';
import ProductScreen from '@/app/urun/[handle]';
import { queryClient } from '@/lib/query-client';

import { getProductByHandle, getRegionId } from '../api';
import { productListSchema } from '../schemas';
import response from './granit-tencere.json';

jest.mock('../api', () => ({
  getRegionId: jest.fn(),
  getProductByHandle: jest.fn(),
}));

const product = productListSchema.parse(response).products[0];
const routes = {
  _layout: RootLayout,
  index: HomeScreen,
  ara: SearchScreen,
  'urun/[handle]': ProductScreen,
};

beforeAll(() => queryClient.setDefaultOptions({ queries: { retry: false } }));
beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(getRegionId).mockResolvedValue('reg_test');
  jest.mocked(getProductByHandle).mockResolvedValue(product);
});
afterEach(() => queryClient.clear());

describe('ürün detayı', () => {
  it('ilk satın alınabilir seçimi fiyat ve stokla gösterir', async () => {
    await renderRouter(routes, { initialUrl: '/urun/granit-tencere' });
    expect(await screen.findByRole('header', { name: 'Granit Tencere' })).toBeTruthy();
    expect(screen.getByText('₺649,90')).toBeTruthy();
    expect(screen.getByText('Stokta')).toBeTruthy();
    expect(getProductByHandle).toHaveBeenCalledWith('reg_test', 'granit-tencere');
  });

  it('seçim değişince fiyat ve stok durumu değişir', async () => {
    await renderRouter(routes, { initialUrl: '/urun/granit-tencere' });
    await fireEvent.press(await screen.findByRole('radio', { name: 'Bordo' }));
    await fireEvent.press(screen.getByRole('radio', { name: '20 cm' }));
    expect(screen.getByText('₺749,90')).toBeTruthy();
    expect(screen.getByText('Son 2 ürün')).toBeTruthy();

    await fireEvent.press(screen.getByRole('radio', { name: '24 cm, tükendi' }));
    expect(screen.getByText('₺899,90')).toBeTruthy();
    expect(screen.getByText('Tükendi')).toBeTruthy();
  });

  it('geçersiz kısa adla sunucuya gitmeden "bulunamadı" der', async () => {
    await renderRouter(routes, { initialUrl: '/urun/Gecersiz_Ad' });
    expect(await screen.findByText('Ürün bulunamadı')).toBeTruthy();
    expect(getProductByHandle).not.toHaveBeenCalled();
  });

  it('sunucuda olmayan ürün için "bulunamadı" der', async () => {
    jest.mocked(getProductByHandle).mockResolvedValue(null);
    await renderRouter(routes, { initialUrl: '/urun/olmayan-urun' });
    expect(await screen.findByText('Ürün bulunamadı')).toBeTruthy();
  });

  it('bağlantı yokken anlaşılır mesaj ve tekrar deneme sunar', async () => {
    jest.mocked(getProductByHandle).mockRejectedValueOnce(new TypeError('Network request failed'));
    await renderRouter(routes, { initialUrl: '/urun/granit-tencere' });
    expect(
      await screen.findByText('İnternet bağlantısı yok ya da sunucuya ulaşılamıyor.'),
    ).toBeTruthy();

    await fireEvent.press(screen.getByRole('button', { name: 'Tekrar dene' }));
    expect(await screen.findByRole('header', { name: 'Granit Tencere' })).toBeTruthy();
  });
});
