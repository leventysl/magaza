import { parseEnv } from '@/lib/env';

const valid = {
  medusaUrl: 'https://api.example.com',
  medusaPublishableKey: 'pk_test',
};

describe('parseEnv', () => {
  it('geçerli değerleri döndürür', () => {
    expect(parseEnv(valid)).toEqual(valid);
  });

  it('eksik değerde hangi alanın hatalı olduğunu söyler', () => {
    expect(() => parseEnv({ ...valid, medusaUrl: undefined })).toThrow('medusaUrl');
  });

  it('http(s) dışındaki adresi reddeder', () => {
    expect(() => parseEnv({ ...valid, medusaUrl: 'javascript:alert(1)' })).toThrow('medusaUrl');
  });

  it('yayımlanabilir olmayan anahtarı reddeder', () => {
    expect(() => parseEnv({ ...valid, medusaPublishableKey: 'sk_secret' })).toThrow(
      'medusaPublishableKey',
    );
  });
});
