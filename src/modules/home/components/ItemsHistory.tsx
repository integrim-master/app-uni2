import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import React from "react";
import { StyleSheet, View } from "react-native";
import { CalendarIcon, TimeIcon } from "../../../components/Icons";
import { useTheme } from "../../../context/ThemeContext";
import { ItemsHistoryProps } from "../types/home.types";

export function ItemsHistory({
  buttons,
  dark,
  procedimiento,
  fecha,
  hora,
  medico,
  estado,
}: ItemsHistoryProps) {
  const { colors } = useTheme();

  const estadoTone =
    estado === "Cancelada"
      ? "danger"
      : estado === "Pendiente"
        ? "warning"
        : "success";

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={[styles.body, { borderLeftColor: colors.primary }]}>
        <ThemedText type="title">{procedimiento}</ThemedText>
        <ThemedText type="subtitle" tone="secondary">
          {medico}
        </ThemedText>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <CalendarIcon size={18} color={colors.primary} />
            <ThemedText type="body">{fecha}</ThemedText>
          </View>
          <View style={styles.metaItem}>
            <TimeIcon size={18} color={dark} />
            <ThemedText type="body">{hora}</ThemedText>
          </View>
          <View
            style={[
              styles.status,
              {
                backgroundColor:
                  estado === "Cancelada"
                    ? "#FEE2E2"
                    : estado === "Pendiente"
                      ? "#FEF3C7"
                      : "#D1FAE5",
              },
            ]}
          >
            <ThemedText type="semiBold" tone={estadoTone}>
              {estado}
            </ThemedText>
          </View>
        </View>
      </View>
      {buttons === "Activo" ? (
        <View style={styles.actions}>
          <View style={[styles.action, { backgroundColor: colors.backgroundSurface }]}>
            <ThemedText type="semiBold" tone="muted" align="center">
              Reagendar
            </ThemedText>
          </View>
          <View style={[styles.action, styles.actionDanger]}>
            <ThemedText type="semiBold" tone="danger" align="center">
              Cancelar
            </ThemedText>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: ui.spacing.xl,
    borderRadius: ui.radii.xl,
    gap: ui.spacing.lg,
  },
  body: {
    gap: ui.spacing.sm,
    paddingHorizontal: ui.spacing.sm,
    borderLeftWidth: ui.spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.md,
  },
  status: {
    flexDirection: "row",
    borderRadius: ui.radii.pill,
    padding: ui.spacing.sm,
    alignItems: "center",
    minHeight: ui.tapTarget,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: ui.spacing.sm,
  },
  action: {
    flex: 1,
    minHeight: ui.tapTarget,
    borderRadius: ui.radii.md,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: ui.spacing.sm,
  },
  actionDanger: {
    backgroundColor: "#FECACA",
  },
});
