import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { ReactNode } from "react";
import { Platform, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface CardProps {
  href?: string;
  className?: string;
  style?: ViewStyle | ViewStyle[];
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
  pressedOpacity = 0.9,
  pressable = true,
  disablePressEffect = false,
}: CardProps) {
  const { colors } = useTheme();

  const shouldUsePressable = Boolean(href || onPress || pressable);

  const CardInner = ({ pressed }: { pressed?: boolean }) => (
    <LinearGradient
      colors={[colors.gradientCard[0], colors.gradientCard[1]]}
      start={{ x: 0.1, y: 2.5 }}
      end={{ x: 0.9, y: 0.9 }}
      style={[
        styles.container,
        {
          borderColor: borderColor || colors.border,
          opacity: disablePressEffect ? 1 : pressed ? pressedOpacity : 1,
          transform: [{ scale: !disablePressEffect && pressed ? 0.985 : 1 }],
        },
        style,
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
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    overflow: "visible",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      },
    }),
  },
});
