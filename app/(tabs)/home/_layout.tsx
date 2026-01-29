import { useTheme } from "@/src/context/ThemeContext";
import HomeHeader from "@/src/modules/home/components/HomeHeader";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, usePathname, useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
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
        headerTransparent: false,
        headerTitle: () => <HomeHeader />,
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
          title: "",
          headerShown: true,
        }}
      />
      {/* <Stack.Screen
        name="support"
        options={{
          title: "Tus solicitudes",
          headerShadowVisible: false,
        }}
      /> */}

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
