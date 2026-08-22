import BrandSpinner from "@/src/components/shared/BrandSpinner";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  message?: string;
};

export default function LoadingComponent({
  message = "Cargando...",
}: Props) {
  return (
    <View style={styles.container}>
      <BrandSpinner />
      <ThemedText type="caption" tone="muted" style={styles.message}>
        {message}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: ui.spacing.lg,
  },
  message: {
    marginTop: ui.spacing.md,
  },
});
