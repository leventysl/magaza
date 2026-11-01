import { StyleSheet, Text } from 'react-native';

import { fonts } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme-colors';

import type { StockStatus } from '../variants';

export function stockLabel(status: StockStatus): string {
  switch (status.kind) {
    case 'out':
      return 'Tükendi';
    case 'low':
      return `Son ${status.quantity} ürün`;
    case 'in':
      return 'Stokta';
  }
}

export function StockBadge({ status }: { status: StockStatus }) {
  const theme = useThemeColors();
  const color =
    status.kind === 'out' ? theme.danger : status.kind === 'low' ? theme.warning : theme.success;
  return <Text style={[styles.text, { color }]}>{stockLabel(status)}</Text>;
}

const styles = StyleSheet.create({
  text: { ...fonts.semibold, fontSize: 14 },
});
