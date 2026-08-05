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
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="login" />
    </Stack>
  );
}
