import { BackButton } from "@/src/components/shared/BackButton";
import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";

export default function DatesTabLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Mis citas",
          headerShown: true,
          headerTintColor: colors.textStrong,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
    </Stack>
  );
}
