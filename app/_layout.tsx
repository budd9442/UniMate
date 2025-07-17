import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AppContextProvider } from '@/context/AppContext';
import { PaperProvider } from 'react-native-paper';
import { theme } from '@/theme/theme';
import { EmergencyButton } from '@/components/EmergencyButton';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AppContextProvider>
      <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      </PaperProvider>
    </AppContextProvider>
  );
}
