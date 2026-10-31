import type { ExpoConfig } from 'expo/config';

// EAS profili APP_VARIANT'ı belirler; geliştirme ve önizleme sürümleri aynı cihazda
// mağaza sürümüyle yan yana kurulabilsin diye paket kimliği sonek alır.
const variant = process.env.APP_VARIANT ?? 'development';
const suffix = variant === 'production' ? '' : `.${variant}`;
const appName = variant === 'production' ? 'Mağaza' : `Mağaza (${variant})`;
const bundleId = `com.leventysl.magaza${suffix}`;

const config: ExpoConfig = {
  name: appName,
  slug: 'magaza',
  version: '0.2.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'magaza',
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: bundleId,
    icon: './assets/expo.icon',
  },
  android: {
    package: bundleId,
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  plugins: [
    'expo-router',
    'expo-secure-store',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#208AEF',
        image: './assets/images/splash-icon.png',
        imageWidth: 76,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
