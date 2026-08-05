import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Image, Platform, Pressable } from "react-native";

export default function HomeLayout() {
  const { colors } = useTheme();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerLeft: () => (
            <Image
              source={require("@/assets/images/logo-careme-white.png")}
              className="h-10 w-40"
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/notifications")}
              hitSlop={8}
              style={{ marginRight: Platform.OS === "ios" ? 4 : 12 }}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={colors.primary}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="suggest"
        options={{
          title: "Tratamientos sugeridos",
          presentation: Platform.OS === "ios" ? "pageSheet" : undefined,
          animation: Platform.OS === "android" ? "slide_from_right" : undefined,
        }}
      />
    </Stack>
  );
}
