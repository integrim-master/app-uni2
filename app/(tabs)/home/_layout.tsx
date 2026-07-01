import { useTheme } from "@/src/context/ThemeContext";
import HomeHeader from "@/src/modules/home/components/HomeHeader";
import { Stack, usePathname, useRouter } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function HomeLayout() {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left",
        headerTintColor: "white",
        headerShadowVisible: false,
        header: ({ navigation, options, back }) => <HomeHeader />,
        headerBlurEffect: "regular",
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="suggest"
        options={{
          title: "",
          headerShadowVisible: false,

          presentation: Platform.OS === "ios" ? "pageSheet" : undefined,

          animation: Platform.OS === "android" ? "slide_from_right" : undefined,
        }}
      />
    </Stack>
  );
}
