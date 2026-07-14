import { useNotifications } from "@/src/context/notifications";
import { useTheme } from "@/src/context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SymbolView } from "expo-symbols";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeHeader: React.FC = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { unreadCount } = useNotifications();
  const insets = useSafeAreaInsets();

  const topPadding =
    Platform.OS === "android"
      ? (StatusBar.currentHeight ?? insets.top)
      : insets.top;

  return (
    <View
      style={{
        backgroundColor: colors.backgroundHeader,
        paddingTop: topPadding,
        paddingBottom: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 16,
          height: 48,
        }}
      >
        <Image
          source={require("../../../../assets/images/logo-careme-white.png")}
          style={{ width: 120, height: 40, resizeMode: "contain" }}
        />
        <Pressable
          onPress={() => router.push("/notifications")}
          style={{ position: "relative" }}
        >
          {Platform.OS === "ios" ? (
            <SymbolView
              name="bell.fill"
              size={26}
              tintColor={colors.primary}
            />
          ) : (
            <Ionicons
              name="notifications"
              size={26}
              color={colors.primary}
            />
          )}
          {unreadCount > 0 && (
            <View
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                backgroundColor: "#FF3B30",
                borderRadius: 10,
                minWidth: 18,
                height: 18,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 3,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;
