import { BackButton } from "@/src/components/shared/BackButton";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
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
      style={styles.gradient}
    >
      <View style={[styles.bar, style]}>
        {back ? (
          <View style={styles.backWrap}>
            <BackButton />
          </View>
        ) : null}
        {typeof title === "string" ? (
          <ThemedText type="titleSm" tone="inverse">
            {title}
          </ThemedText>
        ) : (
          (title ?? null)
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
  },
  bar: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backWrap: {
    position: "absolute",
    left: ui.spacing.md,
    justifyContent: "center",
    height: 56,
  },
});
