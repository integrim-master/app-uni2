import { Link, Slot, Stack, usePathname, useRouter } from 'expo-router';
import "../global.css"
import { ActivityIndicator, Pressable, StatusBar, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../constants/toastConfig';
import { ActionSheetProvider } from "../provider/ActionSheetProvider";
import { LoadingProvider } from "../context/LoadingContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppProviders from '../provider/ProviderComposer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFrameworkReady } from '../hooks/useFrameworkReady';
import { NotificationsProvider } from '../context/NotificationsContext';

export default function RootLayout() {
  
  useFrameworkReady();
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <LoadingProvider>
          <AppProviders>
            <NotificationsProvider>
              <ActionSheetProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="index" />
                      <Stack.Screen name="login" />
                      <Stack.Screen name="(tabs)" />
                      <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusBar style="auto" />
                    <Toast config={toastConfig}/>
              </ActionSheetProvider>
            </NotificationsProvider>
          </AppProviders>
        </LoadingProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
