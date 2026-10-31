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

// Bakır tonu ana renk: mutfak eşyası mağazasına uygun, iki temada da AA kontrastlı.
export const colors: Record<'light' | 'dark', ThemeColors> = {
  light: {
    background: '#FAF7F4',
    surface: '#FFFFFF',
    text: '#1F1A17',
    muted: '#6B625C',
    border: '#E4DDD7',
    primary: '#A2461F',
    onPrimary: '#FFFFFF',
    success: '#2E7D32',
    warning: '#9A5B00',
    danger: '#B3261E',
  },
  dark: {
    background: '#141210',
    surface: '#1F1C19',
    text: '#F3EEEA',
    muted: '#B3A9A2',
    border: '#3A3430',
    primary: '#F0915F',
    onPrimary: '#1F1A17',
    success: '#81C784',
    warning: '#FFB74D',
    danger: '#F2B8B5',
  },
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;
export const radius = { sm: 8, md: 12, pill: 999 } as const;
export const MIN_TOUCH_SIZE = 44;
