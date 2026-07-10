import Badge from "@/src/components/shared/Badge";
import { BenefitUsed } from "@/src/types/shared/Benefits.type";
import { formatDateToText } from "@/src/utils/stringUtils";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

interface ItemUniqueUsedProps {
  data: BenefitUsed;
  onPress?: () => void;
}

export default function ItemUniqueUsed({ data, onPress }: ItemUniqueUsedProps) {
  const { colors } = useTheme();

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
        colors={[colors.gradientCard[0], colors.gradientCard[1]]}
        start={{ x: 0.1, y: 2.5 }}
        end={{ x: 0.9, y: 0.9 }}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            shadowColor: colors.shadow || "#000",
            borderColor: colors.gradientCard[0] || "#ddd",
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
            <Text style={[styles.dateText, { color: colors.textSecondary }]}>
              {formatDateToText(data.date_redeem)}
            </Text>
          </View>

          <Badge
            text="USADO"
            icon="check-circle"
            variant="info"
            style={styles.estadoBadge}
          />
        </View>

        <View style={styles.bottomSection}>
          <Badge text="Canjeado" icon="event-available" variant="success" />
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
    gap: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  dateText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },
  estadoBadge: {
    alignSelf: "flex-start",
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 12,
  },
});
