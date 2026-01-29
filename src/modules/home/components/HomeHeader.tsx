import { useTheme } from "@/src/context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

const HomeHeader: React.FC = () => {
  const { colors, isDark } = useTheme();
  const router = useRouter();

  return (
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
      <TouchableOpacity onPress={() => router.push("/notifications")}>
        <Ionicons
          name="notifications-outline"
          size={28}
          color={colors.primaryLight}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
