import { BackButton } from "@/src/components/shared/BackButton";
import { RequireAuth } from "@/src/components/shared/RequireAuth";
import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";

export default function BlogLayout() {
  const { colors } = useTheme();

  return (
    <RequireAuth>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "center",
          headerTintColor: colors.primary,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            title: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="[details]/index"
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
    </RequireAuth>
  );
}
