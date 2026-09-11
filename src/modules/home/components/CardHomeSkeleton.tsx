import { ui } from "@/src/themes/ui";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

interface CardHomeSkeletonProps {
  isBlack: boolean;
}

export function CardHomeSkeleton({ isBlack }: CardHomeSkeletonProps) {
  const { colors } = useTheme();

  const skeletonColors = isBlack
    ? ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.12)"]
    : ["rgba(0,0,0,0.08)", "rgba(0,0,0,0.14)"];

  return (
    <View style={[styles.wrap, { shadowColor: colors.primaryLight }]}>
      <View style={styles.card}>
        <LinearGradient
          colors={colors.gradientCard as any}
          style={styles.inner}
        >
          <View style={styles.headerRow}>
            <Skeleton
              width={80}
              height={22}
              radius={ui.radii.sm}
              colors={skeletonColors}
            />
            <Skeleton
              width={140}
              height={28}
              radius={ui.radii.sm}
              colors={skeletonColors}
            />
          </View>

          <Skeleton
            width={ui.tapTarget}
            height={ui.spacing.xxl}
            radius={ui.radii.sm}
            colors={skeletonColors}
          />

          <View style={styles.stats}>
            <View style={styles.statsRow}>
              <Skeleton
                width={160}
                height={14}
                radius={ui.radii.sm}
                colors={skeletonColors}
              />
              <Skeleton
                width={50}
                height={14}
                radius={ui.radii.sm}
                colors={skeletonColors}
              />
            </View>

            <Skeleton
              width="100%"
              height={ui.spacing.xs}
              radius={ui.radii.pill}
              colors={skeletonColors}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    borderRadius: ui.radii.xl,
  },
  card: {
    width: "100%",
    aspectRatio: 5 / 3,
    borderRadius: ui.radii.xl,
    overflow: "hidden",
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
    padding: ui.spacing.xl,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stats: {
    gap: ui.spacing.sm,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
