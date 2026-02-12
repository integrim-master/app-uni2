import { toastConfig } from "@/src/constants/toastConfig";
import { AuthProvider } from "@/src/context/AuthContext";
import { DiagnosticProvider } from "@/src/context/DiagnosticContext";
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
import { router, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import "../global.css";
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
        if (status !== "granted") {
          console.log("Permission not granted for notifications");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo Push Token:", token);
        setPushToken(token);
        return token;
      } catch (error) {
        console.error("Error getting push token:", error);
      }
    };
    register();
  }, [setPushToken]);

  useEffect(() => {
    if (lastNotificationResponse) {
      const { title, body, data } =
        lastNotificationResponse.notification.request.content;
      addNotification({
        id: lastNotificationResponse.notification.request.identifier,
        title: title || "Notificación",
        body: body || "",
        data: data,
        receivedAt: new Date(lastNotificationResponse.notification.date),
      });
      console.log("App opened from notification:", lastNotificationResponse);
    }
  }, [lastNotificationResponse, addNotification]);

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
        console.log("Notification received:", notification);
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
        console.log("Notification response received:", response);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NotificationsProvider>
          <NotificationListener />
          <BottomSheetModalProvider>
            <ThemeProvider>
              <LoadingProvider>
                <AuthProvider>
                  <DiagnosticProvider>
                    <PromotionGuard>
                      <Slot />
                    </PromotionGuard>
                  </DiagnosticProvider>
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
