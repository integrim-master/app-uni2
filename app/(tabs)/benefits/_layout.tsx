import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function BenefitsLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: colors.textMuted,
        headerShadowVisible: false,
        headerTransparent: Platform.OS === "ios",
        headerBlurEffect: "systemChromeMaterial",
        headerBackButtonDisplayMode: "minimal",
        headerStyle: {
          backgroundColor:
            Platform.OS === "android"
              ? colors.backgroundHeader
              : colors.backgroundHeader,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Beneficios",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id_benefits]/index"
        options={{
          title: "Detalle del beneficio",
        }}
      />
    </Stack>
  );
}
