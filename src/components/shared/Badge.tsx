import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { ui } from "../../themes/ui";
import ThemedText from "./themed-text";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "premium"
  | "neutral"
  | "white"; // Variante añadida

type BadgeSize = "small" | "medium" | "large";

type BadgeLayout = "horizontal" | "vertical";

type IconName = keyof typeof MaterialIcons.glyphMap;

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: IconName;
  fullWidth?: boolean;
  sharp?: boolean;
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
  sharp = false,
  layout = "horizontal",
  showIcon = true,
  style,
}: BadgeProps) {
  const { colors } = useTheme();

  const getVariantColors = () => {
    switch (variant) {
      case "white":
        return {
          background: "rgba(255, 255, 255, 0.2)",
          text: "#FFFFFF",
          border: "rgba(255, 255, 255, 0.35)",
        };
      case "success":
        return {
          background: `${colors.success || "#10b981"}14`,
          text: colors.success || "#10b981",
          border: `${colors.success || "#10b981"}20`,
        };
      case "warning":
        return {
          background: `${colors.primaryLight || "#10b981"}14`,
          text: colors.primary || "#10b981",
          border: "#f59e0b20",
        };
      case "error":
        return {
          background: "#ef444414",
          text: "#ef4444",
          border: "#ef444420",
        };
      case "info":
        return {
          background: "#3b82f614",
          text: "#3b82f6",
          border: "#3b82f620",
        };
      case "premium":
        return {
          background: `${colors.primary || "#8b5cf6"}14`,
          text: colors.primary || "#8b5cf6",
          border: `${colors.primary || "#8b5cf6"}20`,
        };
      case "neutral":
        return {
          background: `${colors.textSecondary || "#64748b"}10`,
          text: colors.textSecondary || "#64748b",
          border: `${colors.textSecondary || "#64748b"}18`,
        };
      default:
        return {
          background: `${colors.primary || "#6366f1"}14`,
          text: colors.primary || "#6366f1",
          border: `${colors.primary || "#6366f1"}20`,
        };
    }
  };

  const getSizeStyles = () => {
    const baseRadius = sharp ? 6 : ui.radii.md;
    const isVertical = layout === "vertical";
    const iconSizeMultiplier = isVertical ? 1.6 : 1;

    switch (size) {
      case "small":
        return {
          paddingHorizontal: fullWidth ? 12 : 8,
          paddingVertical: fullWidth ? (isVertical ? 10 : 8) : 4,
          fontSize: 10,
          iconSize: Math.round(12 * iconSizeMultiplier),
          gap: isVertical ? 8 : ui.spacing.xs,
          borderRadius: sharp ? 6 : ui.radii.sm,
        };
      case "large":
        return {
          paddingHorizontal: fullWidth ? ui.spacing.xl : ui.spacing.lg,
          paddingVertical: fullWidth ? (isVertical ? 14 : 14) : 10,
          fontSize: isVertical ? 13 : 13,
          iconSize: Math.round(16 * iconSizeMultiplier),
          gap: isVertical ? 8 : ui.spacing.sm,
          borderRadius: sharp ? 8 : ui.radii.lg,
        };
      default:
        return {
          paddingHorizontal: fullWidth ? ui.spacing.lg : ui.spacing.md,
          paddingVertical: fullWidth ? (isVertical ? 12 : 10) : 7,
          fontSize: isVertical ? 12 : 12,
          iconSize: Math.round(14 * iconSizeMultiplier),
          gap: isVertical ? 8 : ui.spacing.xs,
          borderRadius: baseRadius,
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
        return "star";
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
          borderRadius: sizeStyles.borderRadius,
          gap: sizeStyles.gap,
          alignSelf: fullWidth ? "stretch" : "flex-start",
          flexDirection: layout === "vertical" ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
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
            flex: fullWidth && layout === "horizontal" ? 1 : undefined,
            textAlign: layout === "vertical" ? "center" : "left",
            color: variantColors.text, // Forzamos el color del texto del badge
          },
        ]}
        numberOfLines={fullWidth ? undefined : 1}
      >
        {text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
  },
  badgeText: {
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
