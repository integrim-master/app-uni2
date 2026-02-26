import Badge from "@/src/components/shared/Badge";
import ThemedText from "@/src/components/shared/themed-text";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
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
    <Card
      onPress={onPress}
      pressedOpacity={0.96}
      borderColor={colors.border}
      className=""
      style={[styles.card] as any}
    >
      <View style={styles.content}>
        <View className="flex flex-row  gap-2 justify-between">
          <ThemedText
            type="subtitle"
            color={colors.textPrimary}
            className="capitalize"
          >
            {cita.Procedimiento}
          </ThemedText>
          <Badge
            text={cita.categoria}
            variant={cita.categoria === "Estetico" ? "white" : "warning"}
            size="small"
            icon="health-and-safety"
            showIcon={false}
            style={{ marginBottom: 6 }}
          />
        </View>

        <View style={styles.rowSingle}>
          <Ionicons
            name="map-outline"
            size={14}
            color={colors.textLight}
            style={{ marginRight: 8 }}
          />
          <ThemedText className="capitalize w-full">{cita.sede}</ThemedText>
        </View>

        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={colors.text}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.fecha, { color: colors.text }]}>
              {cita.fecha_cita}
            </Text>
          </View>
          <View style={styles.rowItem}>
            <Ionicons
              name="time-outline"
              size={14}
              color={colors.primary}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.hora, { color: colors.primary }]}>
              {cita.hora_cita}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 110,
    borderRadius: 16,
    flexDirection: "column",
    padding: 0,

    marginVertical: 8,
    marginHorizontal: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
    }),
  },

  content: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flex: 1,
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  procedimiento: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    lineHeight: 20,
  },

  especialista: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 8,
  },
  row: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowSingle: {
    marginTop: 6,

    flexDirection: "row",
    alignItems: "center",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  fecha: {
    fontSize: 12,
    fontWeight: "500",
  },
  hora: {
    fontSize: 13,
    fontWeight: "700",
  },
});
