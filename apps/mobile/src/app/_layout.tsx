import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useThemeColors } from '@/hooks/use-theme-colors';
import { queryClient } from '@/lib/query-client';

export default function RootLayout() {
  const theme = useThemeColors();
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.surface },
          headerShadowVisible: false,
          headerTintColor: theme.primary,
          headerTitleStyle: { color: theme.text },
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Mağaza' }} />
        <Stack.Screen name="ara" options={{ title: 'Ara' }} />
      </Stack>
    </QueryClientProvider>
  );
}
