import { useColorScheme } from 'react-native';

import { colors, type ThemeColors } from '@/constants/theme';

export function useThemeColors(): ThemeColors {
  return colors[useColorScheme() === 'dark' ? 'dark' : 'light'];
}
