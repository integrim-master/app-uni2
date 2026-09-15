import { BackButton } from "@/src/components/shared/BackButton";
import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";

/**
 * Stack de rutas públicas de auth. Acceso controlado por Stack.Protected en la raíz.
 */
export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="forgot-password/index"
        options={{
          headerShown: true,
          title: "",

          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="forgot-password/verify"
        options={{
          headerShown: true,
          title: "",

          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="forgot-password/reset"
        options={{
          headerShown: false,
          title: "",
          headerLeft: () => null, // sin back
          gestureEnabled: false, // iOS swipe back off
        }}
      />
    </Stack>
  );
}
