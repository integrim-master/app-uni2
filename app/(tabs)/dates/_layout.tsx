import { useTheme } from "@/src/context/ThemeContext";
import HeaderGradient from "@/src/ui/HeaderGradient";
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
        header: ({ navigation, options, back }) => (
          <HeaderGradient title={options.title as string} back={!!back} />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Mis citas",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="[date_id]/index"
        options={{
          title: "Detalle de la cita",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
