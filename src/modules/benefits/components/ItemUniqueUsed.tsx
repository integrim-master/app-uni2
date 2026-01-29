import { BenefitUsed } from "@/src/types/shared/Benefits.type";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTheme } from "../../../context/ThemeContext";

interface ItemUniqueUsedProps {
  data: BenefitUsed;
  onPress?: () => void;
}

export default function ItemUniqueUsed({
  data,
  onPress,
}: ItemUniqueUsedProps) {
  const { colors } = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.wrapper,
        pressed && { opacity: 0.92, transform: [{ scale: 0.985 }] },
      ]}
      accessibilityLabel={`${data.benefit} - Canjeado`}
      onPress={onPress}
    >
      <LinearGradient
        colors={[colors.gradientCardStart, colors.gradientCardEnd]}
        start={{ x: 0.1, y: 2.5 }}
        end={{ x: 0.9, y: 0.9 }}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            shadowColor: colors.shadow || "#000",
            borderColor: colors.gradientCardStart || "#ddd",
            borderWidth: 1,
          },
        ]}
      >
        <View style={styles.topSection}>
          <View style={styles.titleColumn}>
            <Text
              style={[styles.title, { color: colors.text }]}
              numberOfLines={2}
            >
              {data.benefit}
            </Text>
            <View style={styles.dateContainer}>
              <MaterialIcons
                name="calendar-today"
                size={14}
                color={colors.textSecondary}
              />
              <Text
                style={[styles.dateText, { color: colors.textSecondary }]}
              >
                Canjeado el {formatDate(data.date_redeem)}
              </Text>
            </View>
          </View>

          <LinearGradient
            colors={[`${colors.danger}12`, `${colors.danger}0A`]}
            style={styles.estadoBadge}
            start={[0, 0]}
            end={[1, 0]}
          >
            <MaterialIcons
              name="check-circle"
              size={14}
              color={colors.dangerDark ?? colors.danger}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.estadoText, { color: colors.dangerDark ?? colors.danger }]}>
              USADO
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.perforationWrap}>
          <View
            style={[
              styles.perforationLine,
              { borderColor: colors.border || "#ddd" },
            ]}
          />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.infoPills}>
            <View
              style={[
                styles.pill,
                { backgroundColor: `${colors.success}12` },
              ]}
            >
              <MaterialIcons name="event-available" size={14} color={colors.success} />
              <Text style={[styles.pillText, { color: colors.success }]}>
                Aplicado
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    overflow: "visible",
    position: "relative",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
    }),
  },
  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
    gap: 12,
  },
  titleColumn: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
    marginBottom: 8,
    lineHeight: 22,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.85,
    fontWeight: "500",
  },
  estadoBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  estadoText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  perforationWrap: {
    marginVertical: 14,
  },
  perforationLine: {
    borderTopWidth: 1.5,
    borderStyle: "dashed",
    opacity: 0.35,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  infoPills: {
    flex: 1,
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
    gap: 4,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
