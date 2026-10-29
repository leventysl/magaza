import Medusa from '@medusajs/js-sdk';

import { env } from '@/lib/config';
import { secureStorage } from '@/lib/secure-storage';

// Uygulama yalnızca Store API'yi kullanır: yayımlanabilir anahtar açıktır, yönetici anahtarı asla burada olmaz.
export const medusa = new Medusa({
  baseUrl: env.medusaUrl,
  publishableKey: env.medusaPublishableKey,
  debug: __DEV__,
  auth: {
    type: 'jwt',
    jwtTokenStorageMethod: 'custom',
    storage: secureStorage,
  },
});
