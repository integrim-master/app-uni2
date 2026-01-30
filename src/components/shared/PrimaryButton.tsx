import React from "react";
// import { LinearGradient } from "expo-linear-gradient"; // no se usa
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { ui } from "../../themes/ui";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary" | "danger" | "warning";

interface PrimaryButtonProps {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: Size;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  gradientColors?: string[];
}

const PrimaryButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  size = "sm",
  variant = "primary",
  style,
  textStyle,
  icon,
  gradientColors,
}: PrimaryButtonProps) => {
  const { colors } = useTheme();

  const sizes = {
    sm: { paddingVertical: 8, paddingHorizontal: 10, fontSize: 14 },
    md: { paddingVertical: 12, paddingHorizontal: 16, fontSize: 16 },
    lg: { paddingVertical: 16, paddingHorizontal: 20, fontSize: 18 },
  } as const;

  const s = sizes[size];

  const variantConfig = {
    primary: {
      background: colors.primary,
      text: "#fff",
      border: colors.primary,
    },
    secondary: {
      background: colors.backgroundLight,
      text: colors.textPrimary,
      // border: colors.primaryLight,
    },
    danger: {
      background: colors.danger,
      text: "#fff",
      border: colors.danger,
    },
    warning: {
      background: colors.warning,
      text: "#fff",
      border: colors.warning,
    },
  } as const;

  const config = variantConfig[variant];

  const content = (
    <View
      style={[
        styles.button,
        {
          paddingVertical: s.paddingVertical,
          paddingHorizontal: s.paddingHorizontal,
        },
        disabled && { opacity: 0.6 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={config.text} />
      ) : (
        <>
          <Text
            style={[
              styles.text,
              {
                color: config.text,
                fontSize: s.fontSize,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>

          {icon && <View style={styles.iconWrap}>{icon}</View>}
        </>
      )}
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
    >
      <View
        style={[
          styles.solid,
          style,
          {
            backgroundColor: config.background,
            // borderColor: config.border,
            // borderWidth: ui.borders.hairline,
          },
        ]}
      >
        {content}
      </View>
    </Pressable>
  );
};
export default PrimaryButton;
const styles = StyleSheet.create({
  solid: {
    borderRadius: ui.radii.md,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontWeight: "700",
  },
  iconWrap: {
    marginLeft: 8,
    marginTop: 1,
  },
});
