import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
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
}: PrimaryButtonProps) => {
  const { colors } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue: number) => {
    Animated.timing(scale, {
      toValue,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  const sizes = {
    sm: { paddingVertical: 8, paddingHorizontal: 14, fontSize: 14 },
    md: { paddingVertical: 14, paddingHorizontal: 20, fontSize: 16 },
    lg: { paddingVertical: 18, paddingHorizontal: 24, fontSize: 18 },
  } as const;

  const variantConfig = {
    primary: {
      background: colors.primary,
      pressed: "rgba(0,0,0,0.12)",
      text: "#fff",
    },
    secondary: {
      background: colors.backgroundElevated,
      borderColor: colors.border,
      borderWidth: 1,
      pressed: "rgba(0,0,0,0.08)",
      text: colors.textAccent,
    },
    danger: {
      background: colors.danger,
      pressed: "rgba(0,0,0,0.15)",
      text: "#fff",
    },
    warning: {
      background: colors.warning,
      pressed: "rgba(0,0,0,0.15)",
      text: "#fff",
    },
  } as const;

  const s = sizes[size];
  const config = variantConfig[variant];

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      onPressIn={() => animateTo(0.96)} // 👈 baja suave
      onPressOut={() => animateTo(1)} // 👈 sube suave
    >
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: config.background,
            paddingVertical: s.paddingVertical,
            paddingHorizontal: s.paddingHorizontal,
            transform: [{ scale }],
            opacity: disabled || loading ? 0.6 : 1,
          },
          style,
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
            {icon && <Animated.View style={styles.icon}>{icon}</Animated.View>}
          </>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: ui.radii.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  icon: {
    marginLeft: 8,
  },
});
