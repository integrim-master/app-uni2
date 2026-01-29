import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

export default function PromotionsCarouselSkeleton() {
  const layout = useWindowDimensions();
  const CARD_WIDTH = layout.width * 0.88;
  const CARD_HEIGHT = 150;

  return (
    <View style={styles.promotionSection}>
      <View style={styles.sectionHeader}>
        <Skeleton width={150} height={20} radius={6} />
        <Skeleton width={80} height={20} radius={6} />
      </View>

      <View style={{ alignSelf: "center", flexDirection: "row", gap: 12 }}>
        {[...Array(3).keys()].map((_, index) => (
          <View key={index} style={styles.slideContainer}>
            <Skeleton
              width={CARD_WIDTH / 1.5}
              height={CARD_HEIGHT}
              radius={18}
            />
          </View>
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {[...Array(3).keys()].map((_, index) => (
          <Skeleton key={index} width={18} height={8} radius={4} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  promotionSection: {
    marginBottom: 16,
    marginTop: 10,
  },
  sectionHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    paddingHorizontal: 6,
  },
  slideContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
});
