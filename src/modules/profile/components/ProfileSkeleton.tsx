import { ui } from "@/src/themes/ui";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

export function ProfileSkeleton() {
  const skeletonColors = ["rgba(0,0,0,0.06)", "rgba(0,0,0,0.12)"];

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Skeleton
          width={120}
          height={120}
          radius={ui.radii.pill}
          colors={skeletonColors}
        />

        <View style={styles.gapMd} />

        <Skeleton
          width={180}
          height={24}
          radius={ui.radii.sm}
          colors={skeletonColors}
        />
        <View style={styles.gapSm} />
        <Skeleton
          width={140}
          height={14}
          radius={ui.radii.sm}
          colors={skeletonColors}
        />

        <View style={styles.gapMd} />
        <Skeleton
          width={140}
          height={40}
          radius={ui.radii.md}
          colors={skeletonColors}
        />
      </View>

      <View style={styles.sections}>
        {Array.from({ length: 3 }).map((_, i) => (
          <View key={i} style={styles.section}>
            <Skeleton
              width={160}
              height={18}
              radius={ui.radii.sm}
              colors={skeletonColors}
            />

            <View style={styles.gapMd} />

            {Array.from({ length: 3 }).map((__, j) => (
              <View key={j} style={styles.row}>
                <Skeleton
                  width={40}
                  height={40}
                  radius={ui.radii.sm}
                  colors={skeletonColors}
                />
                <View style={styles.rowCopy}>
                  <Skeleton
                    width="70%"
                    height={14}
                    radius={ui.radii.sm}
                    colors={skeletonColors}
                  />
                  <View style={styles.gapSm} />
                  <Skeleton
                    width="40%"
                    height={12}
                    radius={ui.radii.sm}
                    colors={skeletonColors}
                  />
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: ui.spacing.lg,
    paddingVertical: ui.spacing.lg,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: ui.spacing.sm,
  },
  sections: {
    marginTop: ui.spacing.lg,
  },
  section: {
    marginBottom: ui.spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.md,
    marginBottom: ui.spacing.md,
  },
  rowCopy: {
    flex: 1,
  },
  gapSm: {
    height: ui.spacing.sm,
  },
  gapMd: {
    height: ui.spacing.md,
  },
});
