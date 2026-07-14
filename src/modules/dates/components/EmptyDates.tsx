import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      <Text style={[styles.title, { color: colors.primaryLight }]}>
        {title}
      </Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>{subtitle}</Text>
      {onAction ? (
        <TouchableOpacity
          onPress={onAction}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>
            {actionLabel}
          </Text>
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
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: { fontWeight: "700" },
});
