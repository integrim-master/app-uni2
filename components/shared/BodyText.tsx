import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface BodyTextProps extends TextProps {
  color?: string;
}

const BodyText: React.FC<BodyTextProps> = ({ style, children, color, ...props }) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[styles.body, { color: color || colors.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    fontFamily: "Nunito",
    color: "#333",
  },
});

export default BodyText;