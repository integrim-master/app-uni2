import { ui } from "@/src/themes/ui";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  safeArea?: boolean;
  edges?: readonly Edge[];
  leftButton?: React.ReactNode;
  fullWidth?: boolean;
}

export function Screen({
  children,
  fullWidth = false,
  style,
  safeArea = false,
  edges,
  leftButton,
}: ScreenProps) {
  const { colors } = useTheme();

  const Content = (
    <>
      {leftButton && <View style={styles.header}>{leftButton}</View>}
      <View collapsable={false} style={[styles.content, style]}>
        {children}
      </View>
    </>
  );

  return (
    <View
      collapsable={false}
      style={[
        styles.container,
        { paddingHorizontal: fullWidth ? 0 : ui.spacing.xl },
        { backgroundColor: colors.background },
      ]}
    >
      {safeArea ? (
        <SafeAreaView style={styles.container} edges={edges}>
          {Content}
        </SafeAreaView>
      ) : (
        Content
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    zIndex: 1,
  },
  content: {
    flex: 1,
  },
});
