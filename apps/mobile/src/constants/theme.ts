export type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
  onPrimary: string;
  success: string;
  warning: string;
  danger: string;
};

// "Şef Minimal" yönü (2026-10-31, Levent seçti): siyah-beyaz, tek vurgu yok; ürün görselleri
// öne çıkar. Tüm metin/zemin çiftleri WCAG AA (≥ 4.5:1) ölçüldü.
export const colors: Record<'light' | 'dark', ThemeColors> = {
  light: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#111111',
    muted: '#5C5C5C',
    border: '#E6E6E6',
    primary: '#111111',
    onPrimary: '#FFFFFF',
    success: '#1B7A3A',
    warning: '#8A5A00',
    danger: '#B42318',
  },
  dark: {
    background: '#0B0B0B',
    surface: '#141414',
    text: '#F5F5F5',
    muted: '#A8A8A8',
    border: '#2A2A2A',
    primary: '#F5F5F5',
    onPrimary: '#111111',
    success: '#7DD3A0',
    warning: '#F5C26B',
    danger: '#F7A39B',
  },
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;
export const radius = { sm: 4, md: 4, pill: 4 } as const;
export const MIN_TOUCH_SIZE = 44;

// Inter ailesi; her ağırlık ayrı dosya olarak yüklenir (src/app/_layout.tsx). RN'de özel yazı
// tipinde fontWeight yerine ağırlığa ait aile adı kullanılır.
export const fonts = {
  regular: { fontFamily: 'Inter_400Regular' },
  medium: { fontFamily: 'Inter_500Medium' },
  semibold: { fontFamily: 'Inter_600SemiBold' },
  bold: { fontFamily: 'Inter_700Bold' },
} as const;
