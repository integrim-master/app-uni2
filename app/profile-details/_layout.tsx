import { BackButton } from "@/src/components/shared/BackButton";
import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";

export default function ProfileDetailsLayout() {
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
          headerShown: true,
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primaryLight,
          },
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="edit/index"
        options={{
          headerShown: false,
          headerTitle: "",
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
