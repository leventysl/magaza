import { FetchError } from '@medusajs/js-sdk';
import { z } from 'zod';

import { toAppError } from '@/lib/errors';

describe('toAppError', () => {
  it('ağa ulaşılamayınca bağlantı hatası verir', () => {
    expect(toAppError(new TypeError('Network request failed')).kind).toBe('offline');
    expect(toAppError(new FetchError('failed')).kind).toBe('offline');
  });

  it('404 yanıtını "bulunamadı" sayar', () => {
    expect(toAppError(new FetchError('Not Found', 'Not Found', 404)).kind).toBe('notFound');
  });

  it('sunucu ve beklenmeyen veri hatalarında iç ayrıntıyı göstermez', () => {
    const server = toAppError(new FetchError('db password wrong', 'Internal', 500));
    expect(server.kind).toBe('server');
    expect(server.message).not.toContain('password');

    const invalid = z.object({ id: z.string() }).safeParse({});
    expect(toAppError(invalid.error).kind).toBe('server');
  });
});
