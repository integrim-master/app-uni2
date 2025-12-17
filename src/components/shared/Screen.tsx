import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export function Screen({ children, style }: { children: React.ReactNode; style?: object }) {
  const { colors } = useTheme();
  
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
