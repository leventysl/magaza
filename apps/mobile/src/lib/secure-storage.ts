import * as SecureStore from 'expo-secure-store';

import type Medusa from '@medusajs/js-sdk';

// SDK bu türü dışa aktarmıyor; yapılandırma türünden türetilir.
type AuthStorage = NonNullable<
  NonNullable<ConstructorParameters<typeof Medusa>[0]['auth']>['storage']
>;

// Oturum belirteci yalnızca Keychain/Keystore'da durur ve yedeklerle başka cihaza taşınmaz.
const options: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

// SecureStore anahtarlarında yalnızca harf, rakam, ".", "-" ve "_" geçerlidir.
export function toSecureKey(key: string): string {
  return key.replace(/[^A-Za-z0-9._-]/g, '_');
}

export const secureStorage: AuthStorage = {
  getItem: (key) => SecureStore.getItemAsync(toSecureKey(key), options),
  setItem: (key, value) => SecureStore.setItemAsync(toSecureKey(key), value, options),
  removeItem: (key) => SecureStore.deleteItemAsync(toSecureKey(key), options),
};
