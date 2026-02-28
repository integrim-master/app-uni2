import Badge from "@/src/components/shared/Badge";
import ThemedText from "@/src/components/shared/themed-text";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
  const { colors, isDark } = useTheme();

  return (
    <Card
      onPress={onPress}
      borderColor={colors.border}
      style={styles.cardContainer}
    >
      <View style={styles.topSection}>
        <View style={styles.titleColumn}>
          <ThemedText
            type="titleSm"
            color={colors.textDark}
            style={styles.titleSpacing}
            numberOfLines={2}
          >
            {cita.Procedimiento}
          </ThemedText>

          <View style={styles.locationContainer}>
            <Ionicons
              name="location-sharp"
              size={14}
              color={colors.textSecondary}
            />
            <ThemedText type="label" color={colors.textSecondary}>
              {cita.sede}
            </ThemedText>
          </View>
        </View>

        <Badge
          text={cita.categoria}
          variant={cita.categoria === "Estetico" ? "white" : "warning"}
          size="small"
          showIcon={false}
          style={styles.badge}
        />
      </View>

      <View style={styles.perforationWrap}>
        <View
          style={[
            styles.perforationLine,
            { borderColor: isDark ? colors.border : "#E5E7EB" },
          ]}
        />
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.infoPills}>
          <View
            style={[
              styles.pill,
              { backgroundColor: colors.backgroundDark + "80" },
            ]}
          >
            <Ionicons name="calendar" size={14} color={colors.textSecondary} />
            <ThemedText type="semiBold" color={colors.textSecondary}>
              {cita.fecha_cita}
            </ThemedText>
          </View>

          <View
            style={[styles.pill, { backgroundColor: colors.primary + "15" }]}
          >
            <Ionicons name="time" size={14} color={colors.primary} />
            <ThemedText type="semiBold" color={colors.primary}>
              {cita.hora_cita}
            </ThemedText>
          </View>
        </View>

        <MaterialIcons
          name="chevron-right"
          size={20}
          color={colors.textLight}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    padding: 20,
    flexDirection: "column",
  },

  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  titleColumn: {
    flex: 1,
  },
  titleSpacing: {
    marginBottom: 6,
    textTransform: "capitalize",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    opacity: 0.8,
  },
  badge: {
    alignSelf: "flex-start",
    marginTop: 2,
  },

  perforationWrap: {
    marginVertical: 18,
  },
  perforationLine: {
    borderTopWidth: 1.5,
    borderStyle: "dashed",
    opacity: 0.5,
  },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  infoPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
});
