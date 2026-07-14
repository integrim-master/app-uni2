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
    <View style={styles.benefitsContent}>
      <View style={styles.sectionHeader}>
        <ThemedText
          color={colors.textAccent}
          className="font-bold"
          type="subtitle"
        >
          Tratamientos sugeridos
        </ThemedText>
      </View>
      <SuggestedTreatmentsList SuggestedTreatments={SuggestedTreatments} />
    </View>
  );
};

const styles = StyleSheet.create({
  benefitsContent: {
    marginBottom: 24,
  },
  sectionHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
});
