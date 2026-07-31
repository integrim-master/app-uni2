import { ErrorBoundary } from "@/src/components/shared/ErrorBoundary";
import { toastConfig } from "@/src/constants/toastConfig";
import { AuthProvider } from "@/src/context/AuthContext";
import { LoadingProvider } from "@/src/context/LoadingContext";
import {
  NotificationsProvider,
  useNotifications,
} from "@/src/context/notifications";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { createAppQueryClient } from "@/src/lib/queryClient";
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
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

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

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const [queryClient] = useState(() => createAppQueryClient());

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

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
                      <Stack
                        screenOptions={{
                          headerShown: false,
                          contentStyle: { backgroundColor: BG_COLOR },
                        }}
                      >
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="blog" />
                        <Stack.Screen name="profile-details" />
                      </Stack>
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
}
