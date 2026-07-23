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
  benefitRedemed,
  activeBenefitId,
  isPendingRedeem,
  onPressRedeem,
  onPressViewDetails,
}: ItemUniqueProps) {
  const { colors, isDark } = useTheme();

  const isThisBenefitActive = activeBenefitId === String(data.id);
  const isAnyBenefitActive = activeBenefitId !== null;
  const isThisBenefitRedeemedByBackend =
    Number(benefitRedemed?.id_procedimiento) === data.id;

  const isActive = isThisBenefitActive || isThisBenefitRedeemedByBackend;
  const borderColor = isActive ? colors.primary : colors.border;

  return (
    <Card borderColor={borderColor} pressable={false}>
      <View style={styles.topSection}>
        <View style={styles.titleColumn}>
          <ThemedText
            type="titleSm"
            color={colors.textStrong}
            style={styles.titleSpacing}
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

        {/* <Badge
          text={
            data.remaining > 0
              ? `Restantes: ${data.remaining ?? 0}`
              : `Usado${data.used > 1 ? "s" : ""}: ${data.used}`
          }
          icon={"circle"}
          variant={data.remaining > 0 ? "success" : "default"}
          style={styles.estadoBadge}
        /> */}
      </View>

      {data ? (
        <View style={styles.infoPillsWrap}>
          <Badge
            text={String(data.precio || 0)}
            icon="attach-money"
            variant="neutral"
            size="small"
          />
          {isActive && benefitRedemed?.estado && (
            <Badge
              size="small"
              text={
                benefitRedemed.estado === BENEFIT_STATUS_LABELS.EN_ESPERA
                  ? BENEFIT_STATUS_LABELS.EN_ESPERA
                  : BENEFIT_STATUS_LABELS.CANJEADO
              }
              icon={
                benefitRedemed.estado === BENEFIT_STATUS_LABELS.EN_ESPERA
                  ? "hourglass-empty"
                  : "check-circle"
              }
              variant={
                benefitRedemed.estado === BENEFIT_STATUS_LABELS.EN_ESPERA
                  ? "warning"
                  : "success"
              }
            />
          )}
        </View>
      ) : null}
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

        {/* {isActive && benefitRedemed?.estado && (
          <Badge
            text={
              benefitRedemed.estado === BENEFIT_STATUS_LABELS.EN_ESPERA
                ? BENEFIT_STATUS_LABELS.EN_ESPERA
                : BENEFIT_STATUS_LABELS.CANJEADO
            }
            icon={
              benefitRedemed.estado === BENEFIT_STATUS_LABELS.EN_ESPERA
                ? "hourglass-empty"
                : "check-circle"
            }
            variant={
              benefitRedemed.estado === BENEFIT_STATUS_LABELS.EN_ESPERA
                ? "warning"
                : "success"
            }
            style={styles.pendingBadge}
          />
        )} */}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
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
  titleSpacing: {
    marginBottom: 4,
  },
  estadoBadge: {
    alignSelf: "flex-start",
  },

  infoPillsWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  perforationWrap: {
    marginVertical: ui.spacing.lg,
  },
  perforationLine: {
    borderTopWidth: 1.5,
    borderStyle: "dashed",
    opacity: 0.5,
  },

  bottomSection: {
    flexDirection: "column",
    width: "100%",
  },

  ctaRow: {
    flexDirection: "column",
    gap: 10,
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
    fontSize: 14,
    fontWeight: "800",
  },
});
