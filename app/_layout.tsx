import { ErrorBoundary } from "@/src/components/shared/ErrorBoundary";
import { toastConfig } from "@/src/constants/toastConfig";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { LoadingProvider } from "@/src/context/LoadingContext";
import {
  NotificationsProvider,
  useNotifications,
} from "@/src/context/notifications";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { createAppQueryClient } from "@/src/lib/queryClient";
import { initSentry, Sentry } from "@/src/lib/sentry";
import { PromotionGuard } from "@/src/modules/banner/components/PromotionGuard";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import "../global.css";

initSentry();

const BG_COLOR = "#302D34";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function NotificationListener() {
  const { addNotification, setPushToken } = useNotifications();

  useEffect(() => {
    const register = async () => {
      try {
        const permissions = await Notifications.requestPermissionsAsync();
        if (!(permissions as any).granted) return;
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        setPushToken(token);
      } catch (error) {
        console.error("Error getting push token:", error);
      }
    };
    register();
  }, [setPushToken]);

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { title, body, data } = notification.request.content;
        addNotification({
          id: notification.request.identifier,
          title: title || "Notificación",
          body: body || "",
          data: data,
          receivedAt: new Date(),
        });
      },
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { title, body, data } = response.notification.request.content;
        addNotification({
          id: response.notification.request.identifier,
          title: title || "Notificación",
          body: body || "",
          data: data,
          receivedAt: new Date(response.notification.date),
        });
        router.navigate("notifications");
      });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, [addNotification]);

  return null;
}

/**
 * Auth vive aquí (dentro de AuthProvider).
 * Stack.Protected decide rutas; isAuthTransitioning evita flash login↔home.
 */
function RootNavigator() {
  const { token, loading, isAuthTransitioning } = useAuth();
  const isAuthenticated = !!token;

  useEffect(() => {
    if (loading || isAuthTransitioning) return;
    void SplashScreen.hideAsync();
  }, [loading, isAuthTransitioning]);

  useEffect(() => {
    const t = setTimeout(() => {
      void SplashScreen.hideAsync();
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  // Mientras restaura sesión o hace login/logout: no montar Stack
  // (el overlay de LoadingProvider cubre la UI).
  if (loading || isAuthTransitioning) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: BG_COLOR },
      }}
    >
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="index" />
      </Stack.Protected>
    </Stack>
  );
}

export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const [queryClient] = useState(() => createAppQueryClient());
  const fontsReady = fontsLoaded || !!fontError;

  if (!fontsReady) return null;

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: BG_COLOR }}>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <ThemeProvider>
              <LoadingProvider>
                <AuthProvider>
                  <NotificationsProvider>
                    <NotificationListener />
                    <PromotionGuard>
                      <RootNavigator />
                    </PromotionGuard>
                  </NotificationsProvider>
                </AuthProvider>
              </LoadingProvider>
            </ThemeProvider>
          </BottomSheetModalProvider>
        </QueryClientProvider>

        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
});
