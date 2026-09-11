import Badge from "@/src/components/shared/Badge";
import { Card } from "@/src/components/shared/card";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { BenefitUsed } from "@/src/types/shared/Benefits.type";
import { formatDateToText } from "@/src/utils/stringUtils";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

interface ItemUniqueUsedProps {
  data: BenefitUsed;
  onPress?: () => void;
}

export default function ItemUniqueUsed({ data, onPress }: ItemUniqueUsedProps) {
  const { colors } = useTheme();

  return (
    <Card
      onPress={onPress}
      pressable={Boolean(onPress)}
      accessibilityLabel={`${data.benefit} - Canjeado`}
    >
      <View style={styles.topSection}>
        <View style={styles.titleColumn}>
          <ThemedText
            type="titleSm"
            color={colors.textStrong}
            numberOfLines={2}
          >
            {data.benefit}
          </ThemedText>
          <ThemedText type="caption" color={colors.textSecondary}>
            {formatDateToText(data.date_redeem)}
          </ThemedText>
        </View>

        <Badge
          text="USADO"
          icon="check-circle"
          variant="success"
          size="small"
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: ui.spacing.md,
  },
  titleColumn: {
    flex: 1,
    justifyContent: "center",
    gap: ui.spacing.sm,
  },
});
