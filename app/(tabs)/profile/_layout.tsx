import { useTheme } from "@/src/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function ProfiLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "left",
        headerTintColor: "white",
        headerShadowVisible: false,
        headerTransparent: false,
        headerBackground: () => (
          <LinearGradient
            colors={colors.gradientBackground}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.25 }}
            style={StyleSheet.absoluteFillObject}
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Perfilsss",
          headerShadowVisible: false,
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
