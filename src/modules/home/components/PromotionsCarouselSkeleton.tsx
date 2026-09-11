import { ui } from "@/src/themes/ui";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

export default function PromotionsCarouselSkeleton() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width * 0.78, 320);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Skeleton width={180} height={18} radius={ui.radii.sm} />
      </View>

      <View style={styles.row}>
        <Skeleton width={cardWidth} height={160} radius={ui.radii.xl} />
        <Skeleton width={cardWidth * 0.35} height={160} radius={ui.radii.xl} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: ui.spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ui.spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: ui.spacing.md,
  },
});
