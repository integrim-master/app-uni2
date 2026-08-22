import { ui } from "@/src/themes/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { HistoryByDatesProps } from "../types/home.types";
import { ItemsHistory } from "./ItemsHistory";

export function HistoryByDates({ citas, dark }: HistoryByDatesProps) {
  const citasFilter = citas.slice(0, 2);
  return (
    <View style={styles.list}>
      {citasFilter.map((item, index) => (
        <ItemsHistory
          key={item.id || index}
          dark={dark}
          light=""
          transparent=""
          buttons="Inactivo"
          procedimiento={item.procedimiento}
          fecha={item.fecha}
          hora={item.hora}
          medico={item.especialista}
          estado={item.estado as "Cancelada" | "Pendiente" | "Completada"}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: ui.spacing.lg,
  },
});
