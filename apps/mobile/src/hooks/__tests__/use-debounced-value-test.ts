import { act, renderHook } from '@testing-library/react-native';

import { useDebouncedValue } from '@/hooks/use-debounced-value';

describe('useDebouncedValue', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('değer bekleme süresi boyunca sabit kalınca güncellenir', async () => {
    const { result, rerender } = await renderHook(
      ({ value }: { value: string }) => useDebouncedValue(value, 300),
      {
        initialProps: { value: 'te' },
      },
    );
    await rerender({ value: 'ten' });
    await act(() => jest.advanceTimersByTime(200));
    await rerender({ value: 'tenc' });
    await act(() => jest.advanceTimersByTime(200));
    expect(result.current).toBe('te');

    await act(() => jest.advanceTimersByTime(100));
    expect(result.current).toBe('tenc');
  });
});
