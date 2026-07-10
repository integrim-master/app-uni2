import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  safeArea?: boolean;
  leftButton?: React.ReactNode;
}

export function Screen({
  children,
  style,
  safeArea = false,
  leftButton,
}: ScreenProps) {
  const { colors } = useTheme();

  const Content = (
    <>
      {leftButton && <View style={styles.header}>{leftButton}</View>}
      <View style={[styles.content, style]}>{children}</View>
    </>
  );

  return (
    <LinearGradient
      colors={colors.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {safeArea ? (
        <SafeAreaView style={styles.container}>{Content}</SafeAreaView>
      ) : (
        Content
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 1,
    paddingTop: 10,
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
});
