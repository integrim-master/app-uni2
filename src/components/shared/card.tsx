import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface CardProps {
  href?: string;
  className?: string;
  style?: ViewStyle;
  children?: ReactNode;
  onPress?: () => void;
  backgroundColor?: string;
  borderColor?: string;
  pressedOpacity?: number;
  pressable?: boolean;
  disablePressEffect?: boolean;
}

export function Card({
  href,
  className,
  style,
  children,
  onPress,
  backgroundColor,
  borderColor,
  pressedOpacity = 0.5,
  pressable = true,
  disablePressEffect = false,
}: CardProps) {
  const { colors } = useTheme();

  const shouldUsePressable = Boolean(href || onPress || pressable);

  const CardInner = ({ pressed }: { pressed?: boolean }) => (
    <LinearGradient
      // colors={colors.gradientCard}
      // start={{ x: 0, y: 0 }}
      // end={{ x: 1, y: 1 }}
      colors={[colors.gradientCardStart, colors.gradientCardEnd]}
      start={{ x: 0.1, y: 2.5 }}
      end={{ x: 0.9, y: 0.9 }}
      style={[
        styles.container,
        style,
        {
          borderColor: borderColor || colors.border,
          opacity: disablePressEffect ? 1 : pressed ? pressedOpacity : 1,
        },
      ]}
    >
      {children}
    </LinearGradient>
  );

  let cardContent = null as React.ReactNode;
  if (shouldUsePressable) {
    cardContent = (
      <Pressable onPress={onPress} className={className}>
        {({ pressed }) => <CardInner pressed={pressed} />}
      </Pressable>
    );
  } else {
    cardContent = (
      <View className={className}>
        <CardInner />
      </View>
    );
  }

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
    borderWidth: 0.8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 0.4,

    borderRadius: 12,
    gap: 8,
  },
});
