import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import ThemedText from "./themed-text";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "premium"
  | "neutral"
  | "white";

type BadgeSize = "small" | "medium" | "large";
type BadgeLayout = "horizontal" | "vertical";
type IconName = keyof typeof MaterialIcons.glyphMap;

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: IconName;
  fullWidth?: boolean;
  showIcon?: boolean;
  layout?: BadgeLayout;
  style?: ViewStyle;
}

export default function Badge({
  text,
  variant = "default",
  size = "medium",
  icon,
  fullWidth = false,
  layout = "horizontal",
  showIcon = true,
  style,
}: BadgeProps) {
  const { colors } = useTheme();

  const getVariantColors = () => {
    const soft = (color: string) => ({
      background: `${color}12`,
      text: color,
      border: `${color}25`,
    });

    switch (variant) {
      case "white":
        return {
          background: "rgba(255, 255, 255, 0.15)",
          text: "#FFFFFF",
          border: "rgba(255, 255, 255, 0.3)",
        };
      case "premium":
        return {
          background: "#00000006",
          text: colors.primary,
          border: colors.primary + "35",
        };
      case "success":
        return soft("#10b981");
      case "warning":
        return soft("#f59e0b");
      case "error":
        return soft("#ef4444");
      case "info":
        return soft("#3b82f6");
      case "neutral":
        return soft(colors.textSecondary || "#64748b");
      default:
        return soft(colors.primary);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          paddingHorizontal: 8,
          paddingVertical: 3,
          fontSize: 10,
          iconSize: 12,
          gap: 4,
        };
      case "large":
        return {
          paddingHorizontal: 16,
          paddingVertical: 8,
          fontSize: 13,
          iconSize: 16,
          gap: 8,
        };
      default:
        return {
          paddingHorizontal: 12,
          paddingVertical: 5,
          fontSize: 11,
          iconSize: 14,
          gap: 6,
        };
    }
  };

  const getDefaultIcon = (): IconName | undefined => {
    if (icon) return icon;
    switch (variant) {
      case "success":
        return "check-circle";
      case "warning":
        return "warning";
      case "error":
        return "error";
      case "info":
        return "info";
      case "premium":
        return "stars";
      case "white":
        return "auto-awesome";
      default:
        return undefined;
    }
  };

  const variantColors = getVariantColors();
  const sizeStyles = getSizeStyles();
  const displayIcon = showIcon ? getDefaultIcon() : undefined;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: variantColors.background,
          borderColor: variantColors.border,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          paddingVertical: sizeStyles.paddingVertical,
          alignSelf: fullWidth ? "stretch" : "flex-start",
          flexDirection: layout === "vertical" ? "column" : "row",
          gap: sizeStyles.gap,
        },
        style,
      ]}
    >
      {displayIcon && (
        <MaterialIcons
          name={displayIcon}
          size={sizeStyles.iconSize}
          color={variantColors.text}
        />
      )}
      <ThemedText
        style={[
          styles.badgeText,
          {
            fontSize: sizeStyles.fontSize,
            color: variantColors.text,
            textAlign: "center",
          },
        ]}
      >
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 0.8,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontFamily: "Roboto-Medium",
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
});
