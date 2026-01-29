import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaViewBase, StyleSheet } from "react-native";

import { useTheme } from "../../context/ThemeContext";

export function Screen({
  children,
  style,
  safeArea = false,
}: {
  children: React.ReactNode;
  style?: object;
  safeArea?: boolean;
}) {
  const { colors } = useTheme();

  if (safeArea) {
    return (
      <LinearGradient
        colors={colors.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, style]}
      >
        <SafeAreaViewBase style={styles.container}>{children}</SafeAreaViewBase>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={colors.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
