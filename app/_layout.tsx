import { toastConfig } from "@/src/constants/toastConfig";
import { AuthProvider } from "@/src/context/AuthContext";
import { LoadingProvider } from "@/src/context/LoadingContext";
import {
  NotificationsProvider,
  useNotifications,
} from "@/src/context/notifications";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { PromotionGuard } from "@/src/modules/banner/components/PromotionGuard";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
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
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") return;
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
    Nunito: require("../assets/fonts/Nunito-VariableFont_wght.ttf"),
    NunitoItalic: require("../assets/fonts/Nunito-Italic-VariableFont_wght.ttf"),
  });

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60,
          },
        },
      }),
  );

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: BG_COLOR }}>
      <QueryClientProvider client={queryClient}>
        <NotificationsProvider>
          <NotificationListener />
          <BottomSheetModalProvider>
            <ThemeProvider>
              <LoadingProvider>
                <AuthProvider>
                  <PromotionGuard>
                    <Stack
                      screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: BG_COLOR },
                      }}
                    >
                      <Stack.Screen name="(tabs)" />
                    </Stack>
                  </PromotionGuard>
                </AuthProvider>
              </LoadingProvider>
            </ThemeProvider>
          </BottomSheetModalProvider>
        </NotificationsProvider>
      </QueryClientProvider>

      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
