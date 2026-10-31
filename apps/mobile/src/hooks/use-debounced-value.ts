import { useEffect, useState } from 'react';

/** Değer `delayMs` boyunca değişmeden kalınca güncellenir; arama her harfte sorgu atmasın diye. */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}
