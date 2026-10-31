import { FetchError } from '@medusajs/js-sdk';
import { ZodError } from 'zod';

export type AppErrorKind = 'offline' | 'notFound' | 'server';

export type AppError = {
  kind: AppErrorKind;
  message: string;
};

const MESSAGES: Record<AppErrorKind, string> = {
  offline: 'İnternet bağlantısı yok ya da sunucuya ulaşılamıyor.',
  notFound: 'Aradığınız içerik bulunamadı.',
  server: 'Bir sorun oluştu. Lütfen biraz sonra tekrar deneyin.',
};

/** Hatayı kullanıcıya gösterilecek sınıfa çevirir; iç ayrıntı (yığın, sunucu mesajı) gösterilmez. */
export function toAppError(error: unknown): AppError {
  let kind: AppErrorKind = 'server';
  if (error instanceof FetchError) {
    kind = error.status === 404 ? 'notFound' : error.status === undefined ? 'offline' : 'server';
  } else if (error instanceof ZodError) {
    kind = 'server';
  } else if (error instanceof TypeError) {
    // fetch, ağ bağlantısı kurulamadığında TypeError ("Network request failed") fırlatır.
    kind = 'offline';
  }
  return { kind, message: MESSAGES[kind] };
}
