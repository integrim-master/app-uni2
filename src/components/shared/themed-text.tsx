import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export interface AppTextProps extends TextProps {
  type?: "body" | "title" | "subtitle" | "caption" | "semiBold" | "link";
  color?: string;
}

const ThemedText: React.FC<AppTextProps> = ({
  type = "body",
  color,
  style,
  children,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <Text
      style={[
        styles.base,
        styles[type],
        { color: color || colors.text },
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
    fontFamily: "Roboto-Regular",
  },

  body: {
    fontSize: 15,
    lineHeight: 22,
  },

  semiBold: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: "Roboto-Medium",

  },

  title: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: "Roboto-Bold",
        fontWeight: "800",
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 24,
    fontFamily: "Roboto-Medium",
  },

  caption: {
    fontSize: 12,
    lineHeight: 16,
    opacity: 0.7,
  },

  link: {
    fontSize: 15,
    lineHeight: 22,
    textDecorationLine: "underline",
  },
});

