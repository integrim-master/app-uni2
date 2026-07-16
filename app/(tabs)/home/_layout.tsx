import { useNotifications } from "@/src/context/notifications";
import { useTheme } from "@/src/context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Image, Platform, Pressable, Text, View } from "react-native";

function NotificationButton() {
  const router = useRouter();
  const { colors } = useTheme();
  const { unreadCount } = useNotifications();

  return (
    <Pressable
      onPress={() => router.push("/notifications")}
      style={{ position: "relative", padding: 4 }}
    >
      {Platform.OS === "ios" ? (
        <SymbolView name="bell.fill" size={24} tintColor={colors.primary} />
      ) : (
        <Ionicons name="notifications" size={24} color={colors.primary} />
      )}
      {unreadCount > 0 && (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#FF3B30",
            borderRadius: 9,
            minWidth: 18,
            height: 18,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 3,
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {unreadCount > 99 ? "99+" : unreadCount}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default function HomeLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTransparent: Platform.OS === "ios",
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: colors.primary,
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? colors.backgroundHeader : undefined,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerTransparent: true,
          headerLeft: () => (
            <Image
              source={require("../../../assets/images/logo-careme-white.png")}
              style={{ width: 110, height: 36, resizeMode: "contain" }}
            />
          ),
          headerRight: () => <NotificationButton />,
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
