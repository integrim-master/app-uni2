import { BackButton } from "@/src/components/shared/BackButton";
import { useTheme } from "@/src/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  StatusBar,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  title?: string | React.ReactNode;
  back?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function HeaderGradient({ title, back, style }: Props) {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={colors.gradientBackground}
      start={{ x: 0, y: 10 }}
      end={{ x: 90, y: 10 }}
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
      }}
    >
      <View
        style={[
          {
            height: 56,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          },
          style,
        ]}
      >
        {back ? (
          <View
            style={{
              position: "absolute",
              left: 12,
              justifyContent: "center",
              height: 56,
            }}
          >
            <BackButton />
          </View>
        ) : null}
        {typeof title === "string" ? (
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            {title}
          </Text>
        ) : (
          (title ?? null)
        )}
      </View>
    </LinearGradient>
  );
}
