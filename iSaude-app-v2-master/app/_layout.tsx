import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { TabBadgesProvider } from '@/hooks/useTabBadges';

export const unstable_settings = {
  anchor: 'login',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': Roboto_400Regular,
    'Intelo-Regular': require('../assets/fonts/intelo/Intelo-Regular.ttf'),
    'Intelo-Bold': require('../assets/fonts/intelo/Intelo-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or a loading screen
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TabBadgesProvider>
        <Slot />
      </TabBadgesProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
