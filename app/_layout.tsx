import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Slot } from "expo-router";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { AuthProvider } from "../context/AuthContext";
import { LoadingProvider } from "../context/LoadingContext";
import { NotificationsProvider } from "../context/NotificationsContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
