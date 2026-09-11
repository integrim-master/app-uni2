import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { TratamientoCareme } from "@/src/types/shared/Benefits.type";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SuggestedTreatmentsList } from "./SuggestedTreatmentsList";

interface SuggestedTreatmentsProps {
  SuggestedTreatments: TratamientoCareme[];
}

export const TreatmentsSection: React.FC<SuggestedTreatmentsProps> = ({
  SuggestedTreatments,
}) => {
  return (
    <View style={styles.section}>
      <ThemedText type="subtitle" tone="accent" style={styles.title}>
        Tratamientos sugeridos
      </ThemedText>
      <SuggestedTreatmentsList SuggestedTreatments={SuggestedTreatments} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: ui.spacing.xl,
    marginBottom: ui.spacing.xxl,
  },
  title: {
    marginBottom: ui.spacing.md,
  },
});
