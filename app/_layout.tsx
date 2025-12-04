import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from "../context/AuthContext";
import { LoadingProvider } from "../context/LoadingContext";
import { NotificationsProvider } from "../context/NotificationsContext";
import { ThemeProvider } from "../context/ThemeContext";
import "../global.css";

export default function RootLayout() {
  
  return (
      <GestureHandlerRootView >
        <ThemeProvider>
          <LoadingProvider>
            <AuthProvider>
              <NotificationsProvider>
                <Stack screenOptions={{ headerShown: false }}>

                  <Stack.Screen name="(auth)/login" />
              
                </Stack>
              </NotificationsProvider>
            </AuthProvider>
          </LoadingProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
  );
}
