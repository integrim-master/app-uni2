import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const BodyText: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.body, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  body: {
    fontSize: 16, // Tamaño estándar para texto normal
    fontFamily: "Roboto-Regular",
    color: "#333",
 
  },
});

export default BodyText;