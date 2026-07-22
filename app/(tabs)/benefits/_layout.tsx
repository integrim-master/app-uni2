import { BackButton } from "@/src/components/shared/BackButton";
import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";

export default function BenefitsLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Beneficios",
          headerTintColor: colors.textStrong,
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.backgroundHeader,
          },
        }}
      />

      <Stack.Screen
        name="[id_benefits]/index"
        options={{
          headerShown: true,
          title: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
