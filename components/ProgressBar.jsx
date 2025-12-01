import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

export default function ProgressBar({ value, total, light, dark }) {
  const percentage = (value / total) * 100;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 800, // velocidad del llenado (ms)
      useNativeDriver: false, // width no soporta native driver
    }).start();
  }, [percentage]);

  return (
    <View
      className="w-full h-3 rounded-full overflow-hidden"
      style={{ backgroundColor: light }}
    >
      <Animated.View
        className="h-3 rounded-full"
        style={{
          width: animatedWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
          backgroundColor: dark,
        }}
      />
    </View>
  );
}
