import ThemedText from "@/src/components/shared/themed-text";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { Cita } from "../types/date.api.types";

interface HistoryCardProps {
  cita: Cita;
}

export default function HistoryCard({ cita }: HistoryCardProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.historyCardWrap}>
      <View
        style={[
          styles.historyCard,
          { borderColor: colors.border, backgroundColor: colors.card },
        ]}
      >
        <View style={styles.historyContent}>
          <View style={styles.leftBlock}>
            <View style={{ flex: 1, gap: 6 }}>
              <ThemedText type="semiBold" numberOfLines={1}>
                {cita.Procedimiento}
              </ThemedText>
              <ThemedText type="caption" tone="muted">
                {cita.profesional} · {formatDate(cita.fecha_cita)} ·{" "}
                {cita.hora_cita}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </View>
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
  historyCardWrap: { marginBottom: 14 },
  historyCard: {
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    ...PlatformSelectShadow(),
  },
  historyContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftBlock: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },
});

function PlatformSelectShadow() {
  if (Platform.OS === "ios") {
    return {
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.16,
      shadowRadius: 20,
    };
  }
  return {};
}
