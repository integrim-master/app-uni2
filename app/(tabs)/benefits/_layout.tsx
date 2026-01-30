import { useTheme } from "@/src/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerShadowVisible: false,
        headerBackground: () => (
          <LinearGradient
            colors={colors.gradientBackground}
            start={[0, 0]}
            end={[1, 0]}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Beneficios",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id_benefits]/index"
        options={{
          title: "Tus solicitudes",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
