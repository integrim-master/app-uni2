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
        name="edit/[slug]/index"
        options={{
          title: "Perfil",
          headerShadowVisible: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          // title: "Tus solicitudes",
          // headerShadowVisible: false,
          headerShown: false,
          animation: 'ios_from_left',

          
          
        }}
      />

    
    </Stack>
  );
}
