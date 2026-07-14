import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function ProfileDetailsLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: Platform.OS === "ios" ? "modal" : undefined,
        headerBlurEffect: "systemChromeMaterial",
        headerTransparent: Platform.OS === "ios",
        headerShadowVisible: false,
        headerTintColor: colors.textStrong,
        headerBackButtonDisplayMode: "minimal",
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? "transparent" : undefined,
        },
      }}
    >
      <Stack.Screen
        name="edit/index"
        options={{
          headerShown: false,
          headerTitle: "",
          presentation: Platform.OS === "ios" ? "pageSheet" : undefined,
        }}
      />
      <Stack.Screen
        name="edit/[slug]/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
