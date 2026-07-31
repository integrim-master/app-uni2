import { BackButton } from "@/src/components/shared/BackButton";
import { Stack } from "expo-router";
import React from "react";

export default function DiagnosisLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="camera"
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
    </Stack>
  );
}
