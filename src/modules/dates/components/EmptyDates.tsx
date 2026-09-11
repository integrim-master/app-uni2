import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface EmptyDatesProps {
  title?: string;
  subtitle?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export default function EmptyDates({
  title = "Aún no tienes citas",
  subtitle = "Programa tu primera cita para ver aquí los detalles",
  onAction,
  actionLabel = "Agendar cita",
}: EmptyDatesProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name="time-outline" size={56} color={colors.textMuted} />
      <View style={styles.copy}>
        <ThemedText type="titleSm" tone="primary" align="center">
          {title}
        </ThemedText>
        <ThemedText type="body" align="center">
          {subtitle}
        </ThemedText>
      </View>
      {onAction ? (
        <TouchableOpacity
          onPress={onAction}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <ThemedText type="semiBold" color={colors.background}>
            {actionLabel}
          </ThemedText>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: ui.spacing.xl,
    gap: ui.spacing.lg,
  },
  copy: {
    gap: ui.spacing.sm,
    alignItems: "center",
  },
  button: {
    paddingHorizontal: ui.spacing.lg,
    paddingVertical: ui.spacing.md,
    borderRadius: ui.radii.md,
    marginTop: ui.spacing.sm,
    minHeight: ui.tapTarget,
    justifyContent: "center",
    alignItems: "center",
  },
});
