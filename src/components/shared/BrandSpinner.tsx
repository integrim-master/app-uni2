import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

type Props = {
  size?: number;
};

export default function BrandSpinner({ size = 48 }: Props) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.ring,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [{ rotate: spin }],
        },
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            width: size * 0.17,
            height: size * 0.17,
            borderRadius: size * 0.085,
            marginTop: -size * 0.1,
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ring: {
    borderWidth: 3,
    borderColor: "rgba(226,177,85,0.15)",
    borderTopColor: "#E2B155",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#E2B155",
  },
});
