import { ui } from "@/src/themes/ui";
import { Link } from "expo-router";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

interface CardProps {
  href?: string;
  style?: ViewStyle;
  children?: ReactNode;
  onPress?: () => void;
  backgroundColor?: string;
  borderColor?: string;
  pressedOpacity?: number;
}

export function Card({
  href,
  style,
  children,
  onPress,
  backgroundColor,
  borderColor,
  pressedOpacity = 0.5,
}: CardProps) {
  const { colors } = useTheme();

  const cardContent = (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            style,
            {
              backgroundColor: backgroundColor || colors.card,
              borderColor: borderColor || colors.border,
              opacity: pressed ? pressedOpacity : 1,
            },
          ]}
        >
          {children}
        </View>
      )}
    </Pressable>
  );

  if (href) {
    return (
      <Link asChild href={href}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: ui.borders.width,
    width: 174,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: ui.radii.md,
    paddingHorizontal: ui.spacing.sm,
    paddingVertical: ui.spacing.sm,
    gap: ui.spacing.sm,
  },
});
