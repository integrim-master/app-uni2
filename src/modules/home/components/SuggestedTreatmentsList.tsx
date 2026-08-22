import { ui } from "@/src/themes/ui";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { SuggestedTreatmentsListProps } from "../types/home.treatments.types";
import { SuggestedTreatmentCard } from "./SuggestedTreatmentCard";

const GAP = ui.spacing.md;

export function SuggestedTreatmentsList({
  SuggestedTreatments,
}: SuggestedTreatmentsListProps) {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = useMemo(
    () => Math.min(screenWidth * 0.58, 220),
    [screenWidth],
  );

  if (!SuggestedTreatments?.length) {
    return null;
  }

  return (
    <FlatList
      data={SuggestedTreatments}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : `treatment-${index}`
      }
      renderItem={({ item }) => (
        <View style={{ width: cardWidth }}>
          <SuggestedTreatmentCard
            title={item.title}
            image={item.image || item.imagen}
            link={item.link}
            width={cardWidth}
          />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
      contentContainerStyle={styles.listContent}
      decelerationRate="fast"
      snapToInterval={cardWidth + GAP}
      snapToAlignment="start"
      getItemLayout={(_, index) => ({
        length: cardWidth + GAP,
        offset: (cardWidth + GAP) * index,
        index,
      })}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: ui.spacing.xs,
    paddingBottom: ui.spacing.xs,
  },
});
