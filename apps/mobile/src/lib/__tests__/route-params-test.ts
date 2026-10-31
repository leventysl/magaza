import { parseHandle } from '@/lib/route-params';

describe('parseHandle', () => {
  it('geçerli kısa adı kabul eder', () => {
    expect(parseHandle('granit-tencere')).toBe('granit-tencere');
    expect(parseHandle(['tavalar', 'fazla'])).toBe('tavalar');
  });

  it.each([undefined, '', '../admin', 'Granit Tencere', 'a--b', '-bas', 'x'.repeat(121)])(
    '%p değerini reddeder',
    (value) => {
      expect(parseHandle(value)).toBeUndefined();
    },
  );
});
