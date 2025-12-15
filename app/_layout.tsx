import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { toastConfig } from "../constants/toastConfig";
import { AuthProvider } from "../context/AuthContext";
import { LoadingProvider } from "../context/LoadingContext";
import { NotificationsProvider } from "../context/NotificationsContext";
import { ThemeProvider } from "../context/ThemeContext";
import "../global.css";
import { persistor, store } from "../store";

SplashScreen.preventAutoHideAsync();

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
      })
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>
              <ThemeProvider>
                <LoadingProvider>
                  <AuthProvider>
                    <NotificationsProvider>
                      {/* {isBannerVisible && (
                        <BannerModal
                          visible={isBannerVisible}
                          bannerData={bannerData}
                          onClose={() => setIsBannerVisible(false)}
                        />
                      )} */}
                      <Slot />
                    </NotificationsProvider>
                  </AuthProvider>
                </LoadingProvider>
              </ThemeProvider>
            </BottomSheetModalProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
