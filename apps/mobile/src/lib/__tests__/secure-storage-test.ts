import * as SecureStore from 'expo-secure-store';

import { secureStorage, toSecureKey } from '@/lib/secure-storage';

jest.mock('expo-secure-store', () => ({
  WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'WHEN_UNLOCKED_THIS_DEVICE_ONLY',
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

const deviceOnly = { keychainAccessible: 'WHEN_UNLOCKED_THIS_DEVICE_ONLY' };

describe('secureStorage', () => {
  it('geçersiz karakterleri anahtardan temizler', () => {
    expect(toSecureKey('medusa_auth:token')).toBe('medusa_auth_token');
  });

  it('belirteci yalnızca bu cihaza bağlı olarak yazar', async () => {
    await secureStorage.setItem('medusa_auth_token', 'abc');
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('medusa_auth_token', 'abc', deviceOnly);
  });

  it('okuma ve silmede aynı anahtarı kullanır', async () => {
    await secureStorage.getItem('a:b');
    await secureStorage.removeItem('a:b');
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('a_b', deviceOnly);
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('a_b', deviceOnly);
  });
});
