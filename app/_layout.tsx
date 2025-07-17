import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AppContextProvider } from '@/context/AppContext';
import '../global.css';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AppContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </AppContextProvider>
  );
}
