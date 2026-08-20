import ThemedText from "@/src/components/shared/themed-text";
import { TratamientoCareme } from "@/src/types/shared/Benefits.type";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { SuggestedTreatmentsList } from "./SuggestedTreatmentsList";

interface SuggestedTreatmentsProps {
  SuggestedTreatments: TratamientoCareme[];
}

export const TreatmentsSection: React.FC<SuggestedTreatmentsProps> = ({
  SuggestedTreatments,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.titles}>
          <ThemedText type="subtitle" color={colors.textAccent}>
            Tratamientos sugeridos
          </ThemedText>
          {/* <ThemedText type="caption" color={colors.textSecondary}>
            Pensados para ti
          </ThemedText> */}
        </View>
      </View>
      <SuggestedTreatmentsList SuggestedTreatments={SuggestedTreatments} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingHorizontal: 2,
  },
  titles: {
    gap: 2,
  },
  title: {
    fontWeight: "700",
  },
});
