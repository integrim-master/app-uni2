import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const TitleText: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24, // Tamaño grande para títulos
    fontFamily: "Roboto-Bold", // Cambia según tu fuente
    color: "#000", // Color por defecto
  },
});

export default TitleText;