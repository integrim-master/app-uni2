import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import type { Cita } from "../types/date.api.types";
import CitaCard from "./CitaCard";

export default function CitasList({ citas }: { citas: Cita[] }) {
  if (citas.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <ThemedText type="body" tone="muted" align="center">
          No tienes citas
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.citasContainer}>
      <View style={styles.titleWrap}>
        <ThemedText type="titleSm">Tus citas ({citas.length})</ThemedText>
      </View>
      <FlatList
        data={citas}
        keyExtractor={(item, index) => {
          const keyBase = `${item?.fecha_cita ?? ""}-${item?.hora_cita ?? ""}-${item?.Procedimiento ?? ""}`;
          return `cita-${keyBase || index}`;
        }}
        renderItem={({ item }) => <CitaCard cita={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.citasList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyWrap: {
    marginTop: ui.spacing.lg,
  },
  citasContainer: {
    flex: 1,
  },
  titleWrap: {
    marginBottom: ui.spacing.md,
  },
  citasList: {
    paddingBottom: ui.spacing.xl,
  },
  separator: {
    height: ui.spacing.md,
  },
});
