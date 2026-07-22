import { useTheme } from "@/src/context/ThemeContext";
import HomeHeader from "@/src/modules/home/components/HomeHeader";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function HomeLayout() {
  const { colors } = useTheme();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerShown: true,
          header: () => <HomeHeader />,
        }}
      />
      <Stack.Screen
        name="suggest"
        options={{
          title: "Tratamientos sugeridos",
          presentation: Platform.OS === "ios" ? "pageSheet" : undefined,
          animation: Platform.OS === "android" ? "slide_from_right" : undefined,
        }}
      />
    </Stack>
  );
}
