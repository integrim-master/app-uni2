import { ui } from "@/src/themes/ui";
import React from "react";
import { StyleSheet, View } from "react-native";

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
    <View style={[styles.track, { backgroundColor: background }]}>
      <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: fill }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: ui.spacing.xs,
    borderRadius: ui.radii.pill,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
