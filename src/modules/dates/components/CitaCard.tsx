import Badge from "@/src/components/shared/Badge";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "../../../components/shared/card";
import { useTheme } from "../../../context/ThemeContext";
import { Cita } from "../types/date.api.types";

export default function CitaCard({
  cita,
  onPress,
}: {
  cita: Cita;
  onPress?: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Card onPress={onPress} borderColor="transparent" style={styles.card}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.titleColumn}>
          <ThemedText
            type="titleSm"
            color={colors.textStrong}
            style={styles.title}
            numberOfLines={2}
          >
            {cita.Procedimiento}
          </ThemedText>

          <View style={styles.location}>
            <Ionicons
              name="location-outline"
              size={14}
              color={colors.textMuted}
            />
            <ThemedText type="label" color={colors.textMuted}>
              {cita.sede}
            </ThemedText>
          </View>
        </View>

        <Badge
          text={cita.categoria}
          variant={cita.categoria === "Estetico" ? "premium" : "info"}
          size="xs"
          showIcon={false}
        />
      </View>

      {/* Pie: fecha y hora */}
      <View style={styles.footer}>
        <View style={styles.metaItem}>
          <Ionicons
            name="calendar-outline"
            size={15}
            color={colors.textSecondary}
          />
          <ThemedText type="caption" color={colors.textSecondary}>
            {cita.fecha_cita}
          </ThemedText>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.metaItem}>
          <Ionicons
            name="time-outline"
            size={15}
            color={colors.textSecondary}
          />
          <ThemedText type="caption" color={colors.textSecondary}>
            {cita.hora_cita}
          </ThemedText>
        </View>

        <View style={styles.spacer} />

        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    gap: ui.spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: ui.spacing.md,
  },
  titleColumn: {
    flex: 1,
    gap: ui.spacing.sm,
  },
  title: {
    textTransform: "capitalize",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.xs,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.md,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
  divider: {
    width: ui.borders.width,
    height: ui.spacing.md,
    opacity: 0.6,
  },
  spacer: {
    flex: 1,
  },
});
