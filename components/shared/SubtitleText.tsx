import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const SubtitleText: React.FC<TextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.subtitle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18, // Tamaño medio para subtítulos
    fontFamily: "Nunito", // Cambia según tu fuente
    color: "#555", // Color por Nunitoecto
  },
});

export default SubtitleText;