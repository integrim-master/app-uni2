import { LinearGradient } from "expo-linear-gradient";
import React from "react";
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

type Size = "sm" | "md" | "lg";

interface PrimaryButtonProps {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  gradientColors?: string[];
}

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  size = "sm",
  style,
  textStyle,
  icon,
  gradientColors,
}: PrimaryButtonProps) {
  const { colors } = useTheme();

  const sizes = {
    sm: { paddingVertical: 8, paddingHorizontal: 10, fontSize: 14 },
    md: { paddingVertical: 12, paddingHorizontal: 16, fontSize: 16 },
    lg: { paddingVertical: 16, paddingHorizontal: 20, fontSize: 18 },
  } as const;

  const s = sizes[size];

  const content = (
    <View
      style={[
        styles.button,
        { paddingVertical: s.paddingVertical, paddingHorizontal: s.paddingHorizontal },
        disabled && { opacity: 0.6 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.card} />
      ) : (
        <>
          <Text style={[styles.text, { color: colors.text, fontSize: s.fontSize }, textStyle]}>
            {title}
          </Text>
          {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
        </>
      )}
    </View>
  );


  return (
    <Pressable onPress={onPress} disabled={disabled || loading} accessibilityRole="button">
      {disabled ? (
        <View style={[styles.disabledWrapper, style, { backgroundColor: colors.primaryLight }]}>
          {content}
        </View>
      ) : (
        <LinearGradient
          colors={gradientColors ?? [colors.primaryLight, colors.primary ?? colors.primaryLight] as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, style]}
        >
          {content}
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 12,
    overflow: "hidden",
  },
  disabledWrapper: {
    borderRadius: 12,
    overflow: "hidden",
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
