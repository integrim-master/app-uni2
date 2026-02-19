import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "../../context/ThemeContext";

export function Screen({
  children,
  style,
  safeArea = false,
  leftButton = false,
}: {
  children: React.ReactNode;
  style?: object;
  safeArea?: boolean;
  leftButton?: React.ReactNode;
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
        <SafeAreaView style={styles.container}>
          {leftButton && <React.Fragment>{leftButton}</React.Fragment>}
          {children}
        </SafeAreaView>
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
      {leftButton && <React.Fragment>{leftButton}</React.Fragment>}
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
