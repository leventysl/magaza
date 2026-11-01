import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { useFonts } from '@expo-google-fonts/inter/useFonts';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { fonts } from '@/constants/theme';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { queryClient } from '@/lib/query-client';

// Yazı tipleri yüklenene kadar açılış ekranı açık kalır; metin yanlış yazı tipiyle görünmez.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useThemeColors();
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  // Yazı tipi yüklenemezse sistem yazı tipiyle devam edilir; uygulama açılışta takılmaz.
  const ready = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.surface },
          headerShadowVisible: false,
          headerTintColor: theme.primary,
          headerTitleStyle: { ...fonts.semibold, color: theme.text },
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
