import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import type { AppThemeColors } from "../../themes/colors";

export type TextType =
  | "display"
  | "title"
  | "titleSm"
  | "subtitle"
  | "body"
  | "semiBold"
  | "caption"
  | "label"
  | "micro"
  | "link";

/** Color semántico del tema. Si pasas `color`, gana sobre `tone`. */
export type TextTone =
  | "default"
  | "secondary"
  | "muted"
  | "accent"
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "inverse";

export type TextAlign = "left" | "center" | "right";

export type TextWeight =
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

/** Familia por peso (fuentes estáticas de Expo Google Fonts). */
const FONT: Record<TextWeight, string> = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
  extrabold: "PlusJakartaSans_800ExtraBold",
};

const TYPE_WEIGHT: Record<TextType, TextWeight> = {
  display: "extrabold",
  title: "extrabold",
  titleSm: "bold",
  subtitle: "bold",
  body: "regular",
  semiBold: "semibold",
  caption: "regular",
  label: "semibold",
  micro: "regular",
  link: "semibold",
};

export interface AppTextProps extends Omit<TextProps, "style"> {
  type?: TextType;
  /** Override directo (hex/rgb). Preferir `tone`. */
  color?: string;
  /** Color del tema: secondary, muted, success, inverse, etc. */
  tone?: TextTone;
  align?: TextAlign;
  weight?: TextWeight;
  /**
   * Escape hatch solo para layout extremo (flex, flexShrink).
   * No usar para fontSize, color, fontWeight ni tipografía.
   */
  style?: TextProps["style"];
}

function resolveToneColor(
  tone: TextTone,
  colors: AppThemeColors,
): string | undefined {
  switch (tone) {
    case "default":
      return colors.text;
    case "secondary":
      return colors.textSecondary;
    case "muted":
      return colors.textMuted;
    case "accent":
      return colors.textAccent;
    case "primary":
      return colors.primaryLight;
    case "success":
      return colors.success;
    case "danger":
      return colors.danger;
    case "warning":
      return colors.warning;
    case "inverse":
      return "#FFFFFF";
    default:
      return colors.text;
  }
}

const ThemedText: React.FC<AppTextProps> = ({
  type = "body",
  color,
  tone = "default",
  align,
  weight,
  style,
  children,
  ...props
}) => {
  const { colors } = useTheme();
  const resolvedWeight = weight ?? TYPE_WEIGHT[type];

  return (
    <Text
      style={[
        styles.base,
        styles[type],
        { fontFamily: FONT[resolvedWeight] },
        align ? { textAlign: align } : null,
        { color: color || resolveToneColor(tone, colors) },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ThemedText;

const styles = StyleSheet.create({
  base: {
    fontFamily: FONT.regular,
  },

  display: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.3,
  },

  title: {
    fontSize: 22,
    lineHeight: 28,
  },

  titleSm: {
    fontSize: 18,
    lineHeight: 24,
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 24,
  },

  body: {
    fontSize: 15,
    lineHeight: 22,
  },

  semiBold: {
    fontSize: 15,
    lineHeight: 22,
  },

  caption: {
    fontSize: 13,
    lineHeight: 18,
  },

  label: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  micro: {
    fontSize: 10,
    lineHeight: 14,
  },

  link: {
    fontSize: 15,
    lineHeight: 22,
    textDecorationLine: "underline",
  },
});
