import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { Cita } from "../components/CitaCard";

interface HistoryCardProps {
  cita: Cita;
}

export default function HistoryCard({ cita }: HistoryCardProps) {
  const { colors } = useTheme();
  const [initials, setInitials] = React.useState("");
  const [cfg, setCfg] = React.useState<{ color: string; bgGradient: string[]; label: string }>({ color: colors.text, bgGradient: [colors.card, colors.card], label: cita.estado });

  const getEstadoConfig = (estado: string) => {
    switch (estado) {
      case "Completada":
        return { color: colors.success, bgGradient: [colors.success + "22", colors.success + "11"], label: "Completada" };
      case "Confirmada":
        return { color: colors.primary, bgGradient: [colors.primary + "22", colors.primary + "10"], label: "Confirmada" };
      case "Pendiente":
        return { color: colors.warning, bgGradient: [colors.warning + "22", colors.warning + "10"], label: "Pendiente" };
      default:
        return { color: colors.text, bgGradient: [colors.card, colors.card], label: estado };
    }
  };
  

  useFocusEffect(
    React.useCallback(() => {
      const cfg = getEstadoConfig(cita.estado);
        setCfg(cfg);
  const initials = cita.procedimiento.split(" ").slice(0, 2).map((s) => s[0]).join("").toUpperCase();  
        setInitials(initials);
    }, [])
  );



  return (
    <View style={styles.historyCardWrap}>
      <LinearGradient
        colors={[colors.gradientCardStart ?? colors.card, colors.gradientCardEnd ?? colors.card]}
        style={[styles.historyCard, { borderColor: colors.border }]}
      >
        <View style={styles.historyContent}>
          <View style={styles.leftBlock}>
            <View style={[styles.avatarCircle, { backgroundColor: colors.primary + "22" }]}>
              <Text style={[styles.avatarText, { color: colors.primary }]}>{initials}</Text>
            </View>

            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.procTitle, { color: colors.text }]} numberOfLines={1}>
                {cita.procedimiento}
              </Text>
              <Text style={[styles.procMeta, { color: colors.textLight }]}>
                {cita.especialista} · {formatDate(cita.fecha)} · {cita.hora}
              </Text>
            </View>
          </View>

          <View style={styles.rightBlock}>
            <LinearGradient colors={cfg.bgGradient as any} style={[styles.statusBadge, { borderColor: colors.border }]}>
              <MaterialIcons name="check-circle" size={14} color={cfg.color} />
              <Text style={[styles.statusText, { color: cfg.color }]}>{cfg.label}</Text>
            </LinearGradient>

            <Ionicons name="chevron-forward" size={20} color={colors.textLight} style={{ marginTop: 8 }} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

function formatDate(d: string) {
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
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
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { fontWeight: "800", fontSize: 16 },
  procTitle: { fontSize: 16, fontWeight: "800" },
  procMeta: { fontSize: 13, marginTop: 6 },
  rightBlock: {
    alignItems: "flex-end",
    minWidth: 86,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.6,
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

}