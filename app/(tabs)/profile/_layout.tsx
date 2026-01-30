import { useTheme } from "@/src/context/ThemeContext";
import HeaderGradient from "@/src/ui/HeaderGradient";
import { Stack } from "expo-router";
import React from "react";

export default function ProfiLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerShadowVisible: false,
        headerTransparent: false,
        header: ({ navigation, options, back }) => (
          <HeaderGradient title={options.title as string} back={!!back} />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Perfil",
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          title: "Tus solicitudes",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          title: "Política de privacidad",
          headerShadowVisible: false,
        }}
      />

      <Stack.Screen
        name="details"
        options={{
          title: "Mi perfil",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
