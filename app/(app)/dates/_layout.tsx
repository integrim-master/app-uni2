import { BackButton } from "@/src/components/shared/BackButton";
import { useTheme } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import React from "react";

/**
 * Detalle de cita fuera de NativeTabs (como benefits / profile-details).
 * Así no aparecen los tabs ni hace falta ocultarlos con context.
 */
export default function DateDetailsLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="[date_id]/index"
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
