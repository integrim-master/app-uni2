import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";

export default function DatesLayout() {
  const { colors } = useTheme();

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Mis citas",
          headerShown: true,
          headerTitle: "Mis citas",
          headerTintColor: colors.textStrong,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <Stack.Screen
        name="[date_id]/index"
        options={{
          title: "Detalle de la cita",
          headerShown: true,
          headerTitle: "Detalle de la cita",
          headerTintColor: colors.textStrong,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </Stack>
  );
}
