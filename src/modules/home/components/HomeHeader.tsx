import { useTheme } from "@/src/context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Platform, Pressable, StatusBar, View } from "react-native";

const HomeHeader: React.FC = () => {
  const { colors, isDark } = useTheme();
  const router = useRouter();

  const content = (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 11,
      }}
    >
      <Image
        source={
          isDark
            ? require("../../../../assets/images/logo-careme-white.png")
            : require("../../../../assets/images/logo-careme-black.png")
        }
        style={{ width: 120, height: 40, resizeMode: "contain" }}
      />
      <Pressable onPress={() => router.push("/notifications")}>
        <Ionicons
          name="notifications-outline"
          size={28}
          color={colors.primary}
        />
      </Pressable>
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: colors.gradientBackground?.[0] ?? colors.primary,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 70,
      }}
    >
      {content}
    </View>
  );
};

export default HomeHeader;
