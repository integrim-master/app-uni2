import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function DatesLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: colors.primary,
        headerShadowVisible: false,
        headerBlurEffect: "systemChromeMaterial",
        headerTransparent: Platform.OS === "ios",
        headerBackButtonDisplayMode: "minimal",
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? colors.background : undefined,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Mis citas",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[date_id]/index"
        options={{
          title: "Detalle de la cita",
        }}
      />
    </Stack>
  );
}
