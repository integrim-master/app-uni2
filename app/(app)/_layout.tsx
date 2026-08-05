import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";

/**
 * Stack de rutas privadas. La auth la decide el Stack raíz con Stack.Protected.
 */
export default function AppLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="scan"
        options={{
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen name="blog" />
      <Stack.Screen name="profile-details" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="media" />
    </Stack>
  );
}
