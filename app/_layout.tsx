import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
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

  if (!fontsLoaded) return null;

  SplashScreen.hideAsync();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BottomSheetModalProvider>
            <ThemeProvider>
              <LoadingProvider>
                <AuthProvider>
                  <NotificationsProvider>
                    <Slot />
                  </NotificationsProvider>
                </AuthProvider>
              </LoadingProvider>
            </ThemeProvider>
          </BottomSheetModalProvider>
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
