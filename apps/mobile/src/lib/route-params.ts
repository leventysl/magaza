import { z } from 'zod';

// Rota parametreleri derin bağlantıdan da gelebilir: güvenilmez kabul edilir.
const handleSchema = z
  .string()
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

/** Ürün/kategori kısa adını doğrular; geçersizse `undefined`. */
export function parseHandle(value: string | string[] | undefined): string | undefined {
  const result = handleSchema.safeParse(Array.isArray(value) ? value[0] : value);
  return result.success ? result.data : undefined;
}
