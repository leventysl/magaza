import { parseEnv } from '@/lib/env';

// Uygulama açılırken bir kez doğrulanır; eksik ya da hatalı değerde hemen hata verir.
export const env = parseEnv({
  medusaUrl: process.env.EXPO_PUBLIC_MEDUSA_URL,
  medusaPublishableKey: process.env.EXPO_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});
