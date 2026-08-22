import EmptySvg from "@/assets/svg/Empty.svg";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import React from "react";
import { StyleSheet, View } from "react-native";

const SupportHistory: React.FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <EmptySvg width={280} height={280} />
      <View style={styles.copy}>
        <ThemedText type="title" tone="primary" align="center">
          No hay historial
        </ThemedText>
        <ThemedText type="body" align="center">
          Tu historial de soporte aparecerá aquí
        </ThemedText>
        <ThemedText type="caption" tone="secondary" align="center">
          Cuando tengas solicitudes resueltas, podrás consultarlas en este
          espacio.
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: ui.spacing.xxl,
  },
  copy: {
    gap: ui.spacing.sm,
    alignItems: "center",
    paddingHorizontal: ui.spacing.lg,
  },
});

export default SupportHistory;
