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
    fontSize: 24,
    fontFamily: "Nunito", 
    color: "#000", 
  },
});

export default TitleText;