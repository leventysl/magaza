import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { MIN_TOUCH_SIZE, radius, spacing, fonts } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme-colors';

type Props =
  | { kind: 'loading' }
  | { kind: 'message'; title: string; description?: string; onRetry?: () => void };

/** Yükleniyor, boş ve hata durumları için ortak tam ekran görünüm. */
export function StateView(props: Props) {
  const theme = useThemeColors();
  if (props.kind === 'loading') {
    return (
      <View style={styles.container} accessibilityLabel="Yükleniyor">
        <ActivityIndicator color={theme.primary} size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={[styles.title, { color: theme.text }]}>
        {props.title}
      </Text>
      {props.description ? (
        <Text style={[styles.description, { color: theme.muted }]}>{props.description}</Text>
      ) : null}
      {props.onRetry ? (
        <Pressable
          accessibilityRole="button"
          onPress={props.onRetry}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>Tekrar dene</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  title: { ...fonts.semibold, fontSize: 18, textAlign: 'center' },
  description: { ...fonts.regular, fontSize: 15, textAlign: 'center' },
  button: {
    minHeight: MIN_TOUCH_SIZE,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    justifyContent: 'center',
  },
  buttonText: { ...fonts.semibold, fontSize: 16 },
});
