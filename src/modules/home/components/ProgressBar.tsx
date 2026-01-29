import React from "react";
import { View } from "react-native";

interface ProgressBarProps {
  value: number;
  total: number;
  background: string;
  fill: string;
}

export function ProgressBar({
  value,
  total,
  background,
  fill,
}: ProgressBarProps) {
  const percentage = Math.min((value / total) * 100, 100);

  return (
    <View
      style={{
        height: 6,
        borderRadius: 999,
        backgroundColor: background,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${percentage}%`,
          backgroundColor: fill,
        }}
      />
    </View>
  );
}
