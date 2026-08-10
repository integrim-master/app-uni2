import { BackButton } from "@/src/components/shared/BackButton";
import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";

export default function BenefitDetailsLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="[id_benefits]/index"
        options={{
          headerShown: true,
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerLeft: () => <BackButton />,
        }}
      />
    </Stack>
  );
}
