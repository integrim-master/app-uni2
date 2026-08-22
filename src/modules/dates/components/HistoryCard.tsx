import { Card } from "@/src/components/shared/card";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Cita } from "../types/date.api.types";

interface HistoryCardProps {
  cita: Cita;
}

export default function HistoryCard({ cita }: HistoryCardProps) {
  return (
    <Card pressable={false} style={styles.card}>
      <View style={styles.copy}>
        <ThemedText type="titleSm" numberOfLines={1}>
          {cita.Procedimiento}
        </ThemedText>
        <ThemedText type="caption" tone="muted">
          {cita.profesional} · {formatDate(cita.fecha_cita)} · {cita.hora_cita}
        </ThemedText>
      </View>
    </Card>
  );
}

function formatDate(d: string) {
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

const styles = StyleSheet.create({
  card: {
    padding: ui.spacing.lg,
  },
  copy: {
    gap: ui.spacing.sm,
  },
});
