import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

export default function PromotionsCarouselSkeleton() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width * 0.78, 320);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Skeleton width={180} height={18} radius={6} />
        <Skeleton width={70} height={14} radius={6} />
      </View>

      <View style={styles.row}>
        <Skeleton width={cardWidth} height={160} radius={20} />
        <Skeleton width={cardWidth * 0.35} height={160} radius={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
  },
});
