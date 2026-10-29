import { z } from 'zod';

// EXPO_PUBLIC_ değerleri uygulama paketine düz metin gömülür: buraya yalnızca açık değerler girer.
// Expo yalnızca `process.env.EXPO_PUBLIC_X` biçimini değiştirir; yıkım (destructuring) çalışmaz.
const envSchema = z.object({
  medusaUrl: z.url({ protocol: /^https?$/ }),
  medusaPublishableKey: z.string().startsWith('pk_'),
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(raw: Record<keyof Env, string | undefined>): Env {
  const result = envSchema.safeParse(raw);
  if (!result.success) {
    const fields = result.error.issues.map((issue) => issue.path.join('.')).join(', ');
    throw new Error(`Geçersiz ortam değişkenleri: ${fields}. .env.example dosyasına bakın.`);
  }
  return result.data;
}
