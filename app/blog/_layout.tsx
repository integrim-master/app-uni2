import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function BlogLayout() {
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[details]/index"
        options={{
          title: "Artículo",
        }}
      />
    </Stack>
  );
}
