import { Image } from 'expo-image';
import { StyleSheet, Text, View, type DimensionValue } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';

type Props = {
  uri?: string | null;
  label: string;
  /** Yalnızca boyut: görsel ve yer tutucu aynı alanı kaplar. */
  style?: { width?: DimensionValue; height?: DimensionValue; aspectRatio?: number };
};

/** Ürün görseli; görsel yoksa sade bir yer tutucu gösterir. */
export function ProductImage({ uri, label, style }: Props) {
  const theme = useThemeColors();
  if (!uri) {
    return (
      <View
        accessibilityRole="image"
        accessibilityLabel={`${label} — görsel yok`}
        style={[styles.placeholder, { backgroundColor: theme.border }, style]}
      >
        <Text style={styles.icon} importantForAccessibility="no">
          🍲
        </Text>
      </View>
    );
  }
  return (
    <Image
      source={{ uri }}
      accessibilityLabel={label}
      contentFit="cover"
      transition={150}
      style={[styles.image, style]}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%' },
  icon: { fontSize: 40, opacity: 0.6 },
});
