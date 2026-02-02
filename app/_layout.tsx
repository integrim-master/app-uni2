import { toastConfig } from "@/src/constants/toastConfig";
import { AuthProvider } from "@/src/context/AuthContext";
import { DiagnosticProvider } from "@/src/context/DiagnosticContext";
import { LoadingProvider } from "@/src/context/LoadingContext";
import { NotificationsProvider } from "@/src/context/notifications";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useState } from "react";
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

  const [isBannerVisible, setIsBannerVisible] = React.useState(true);

  if (!fontsLoaded) return null;

  SplashScreen.hideAsync();

  const bannerData = {
    title: "¡Bienvenido a CareMeeee",
    description:
      "Tu salud y bienestar son nuestra prioridad. Explora nuestros servicios y agenda tu cita hoy mismo.",
    image: "../assets/images/campana.jpg",
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NotificationsProvider>
          <BottomSheetModalProvider>
            <ThemeProvider>
              <LoadingProvider>
                <AuthProvider>
                  <DiagnosticProvider>
                    {/* {isBannerVisible && (
                      <BannerModal
                        visible={isBannerVisible}
                        bannerData={bannerData}
                        onClose={() => setIsBannerVisible(false)}
                      />
                    )} */}
                    <Slot />
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
