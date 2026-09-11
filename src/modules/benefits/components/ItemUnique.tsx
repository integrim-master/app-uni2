import Badge from "@/src/components/shared/Badge";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Card } from "@/src/components/shared/card";
import ThemedText from "@/src/components/shared/themed-text";
import { BENEFIT_STATUS_LABELS } from "@/src/constants/benefitStatus";
import { AppColors as Colors } from "@/src/themes/colors";
import { ui } from "@/src/themes/ui";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { ItemUniqueProps } from "../types/benefits.types";

export default function ItemUnique({
  data,
  activeBenefitId,
  isPendingRedeem,
  onPressRedeem,
  onPressViewDetails,
}: ItemUniqueProps) {
  const { colors, isDark } = useTheme();

  // `data.active` es la fuente de verdad que envía el backend: indica que
  // ESTE beneficio fue reclamado y está esperando confirmación.
  // `isThisBenefitActive` (por `activeBenefitId`) solo se usa como respaldo
  // optimista mientras la mutación de "aplicar" está en vuelo y todavía no
  // se refresca la data del backend.
  const isThisBenefitActive = activeBenefitId === String(data.id);
  console.log("activeBenefitId", activeBenefitId);
  console.log("data.id", data.id);
  const isAnyBenefitActive = activeBenefitId !== null;

  const isActive = data.active || isThisBenefitActive;
  const borderColor = isActive ? colors.primary : colors.border;

  return (
    <Card borderColor={borderColor} pressable={false}>
      <View style={styles.topSection}>
        <View style={styles.titleColumn}>
          <ThemedText
            type="titleSm"
            color={colors.textStrong}
            numberOfLines={2}
          >
            {data.title || "Nombre del beneficio"}
          </ThemedText>
          <ThemedText
            type="body"
            color={colors.textSecondary}
            numberOfLines={2}
          >
            {data.description}
          </ThemedText>
        </View>
      </View>

      <View className="flex flex-row  gap-2">
        <Badge
          text={`${data.remaining ?? 0} disponibles`}
          icon="inventory"
          variant={(data.remaining ?? 0) > 0 ? "success" : "neutral"}
          size="xs"
        />
        {/* <Badge
          text="Válido hasta 31 Dic 2026"
          icon="event"
          variant="neutral"
          size="xs"
        /> */}
        {isActive && (
          <Badge
            size="xs"
            text={BENEFIT_STATUS_LABELS.EN_ESPERA}
            icon="hourglass-empty"
            variant="warning"
          />
        )}
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
        <View style={styles.ctaRow}>
          <PrimaryButton
            title="Ver"
            variant="secondary"
            onPress={onPressViewDetails}
            icon={
              <MaterialIcons
                name="visibility"
                size={16}
                color={colors.primaryLight}
              />
            }
          />

          <PrimaryButton
            title={isActive ? "Cancelar" : "Aplicar"}
            textStyle={styles.applyText}
            onPress={() =>
              onPressRedeem?.(data, isActive ? "cancelar" : "aplicar")
            }
            disabled={isAnyBenefitActive && !isThisBenefitActive}
            loading={isPendingRedeem && isThisBenefitActive}
            style={styles.aplicarBtn}
            icon={
              <MaterialIcons
                name={isActive ? "cancel" : "check-circle"}
                size={16}
                color={colors.cardText}
              />
            }
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: ui.spacing.md,
    gap: ui.spacing.md,
  },
  titleColumn: {
    flex: 1,
    justifyContent: "center",
    gap: ui.spacing.sm,
  },
  infoPillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
  perforationWrap: {
    marginVertical: ui.spacing.lg,
  },
  perforationLine: {
    borderTopWidth: ui.borders.width,
    borderStyle: "dashed",
    opacity: 0.5,
  },

  bottomSection: {
    flexDirection: "column",
    width: "100%",
  },

  ctaRow: {
    flexDirection: "column",
    gap: ui.spacing.md,
    width: "100%",
  },
  verBtn: {
    flex: 1,
  },
  aplicarBtn: {
    flex: 1.4,
  },
  applyText: {
    color: Colors.cardText,
  },
});
