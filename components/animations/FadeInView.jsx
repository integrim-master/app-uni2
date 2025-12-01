import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const FadeInView = ({ style, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // 👈 valor inicial en 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 1 segundo
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim, // 👈 el fade animado
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};
