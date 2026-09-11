import { useNotifications } from "@/src/context/notifications";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Image, Platform, Pressable, Text, View } from "react-native";

export default function HomeLayout() {
  const { colors } = useTheme();
  const { unreadCount } = useNotifications();

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
              <View className="relative p-1">
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={colors.primary}
                />

                {unreadCount > 0 && (
                  <View className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 rounded-full items-center justify-center border-2 border-white dark:border-black">
                    <Text className="text-[10px] font-bold text-white">
                      {unreadCount > 99 ? "+99" : unreadCount}
                    </Text>
                  </View>
                )}
              </View>
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
