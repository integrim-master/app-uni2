import Badge from "@/src/components/shared/Badge";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { BENEFIT_STATUS_LABELS } from "@/src/constants/benefitStatus";
import { Colors } from "@/src/themes/colors";
import { ui } from "@/src/themes/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
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
  const { colors } = useTheme();

  const isThisBenefitActive = activeBenefitId === String(data.id);
  const isAnyBenefitActive = activeBenefitId !== null;
  const isThisBenefitRedeemedByBackend =
    Number(benefitRedemed?.id_procedimiento) === data.id;

  console.log(
    "Rendering ItemUnique for benefit ID:",
    data.id,
    " | isThisBenefitActive:",
    isThisBenefitActive,
    " | isAnyBenefitActive:",
    isAnyBenefitActive,
    " | isThisBenefitRedeemedByBackend:",
    isThisBenefitRedeemedByBackend,
  );

  return (
    <Pressable
      style={({ pressed }) => [
        styles.wrapper,
        pressed && { opacity: 0.92, transform: [{ scale: 0.985 }] },
      ]}
      accessibilityLabel={`${data.title}`}
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
            borderColor:
              isThisBenefitActive || isThisBenefitRedeemedByBackend
                ? colors.primary
                : colors.border,
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
              {data.title || "Nombre del beneficio"}
            </Text>
            <Text
              style={[styles.desc, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {data.description}
            </Text>
          </View>
          <Badge
            text={
              data.remaining > 0
                ? `Restantes: ${data.remaining ?? 0}`
                : `Usado${data.used > 1 ? "s" : ""}: ${data.used}`
            }
            icon={"circle"}
            variant={"default"}
            style={styles.estadoBadge}
          />
        </View>

        {data ? (
          <View style={[styles.pill]}>
            <MaterialIcons
              name="attach-money"
              size={14}
              color={colors.textSecondary}
            />
            <Text style={[styles.pillText, { color: colors.textSecondary }]}>
              {data.precio || 0}
            </Text>

            <View
              style={[
                styles.pill,
                { backgroundColor: "rgba(179, 142, 44, 0.08)" },
              ]}
            >
              <MaterialIcons name="schedule" size={14} color="#B38E2C" />
              <Text style={[styles.pillText, { color: "#B38E2C" }]}>
                Diciembre
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styles.perforationWrap}>
          <View
            style={[
              styles.perforationLine,
              { borderColor: colors.border || "#ddd" },
            ]}
          />
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.infoPillsColumn}>
            <View style={styles.ctaWrap}>
              <PrimaryButton
                title="Ver"
                style={styles.fullWidthBtn}
                variant="secondary"
                onPress={onPressViewDetails}
                icon={
                  <MaterialIcons
                    name="visibility"
                    size={16}
                    color={colors.cardTextDark}
                  />
                }
              />
              <View style={{ height: 10 }} />
              <PrimaryButton
                title={
                  isThisBenefitActive || isThisBenefitRedeemedByBackend
                    ? "Cancelar"
                    : "Aplicar"
                }
                textStyle={styles.applyText}
                onPress={() =>
                  onPressRedeem?.(
                    data,
                    isThisBenefitActive || isThisBenefitRedeemedByBackend
                      ? "cancelar"
                      : "aplicar",
                  )
                }
                disabled={isAnyBenefitActive && !isThisBenefitActive}
                loading={isPendingRedeem && isThisBenefitActive}
                style={styles.fullWidthBtn}
                icon={
                  <MaterialIcons
                    name={
                      isThisBenefitActive || isThisBenefitRedeemedByBackend
                        ? "cancel"
                        : "check-circle"
                    }
                    size={16}
                    color={colors.cardTextDark}
                  />
                }
              />
            </View>

            {(isThisBenefitActive || isThisBenefitRedeemedByBackend) &&
              benefitRedemed?.estado && (
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
              )}
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
    borderRadius: ui.radii.xl,
    padding: ui.spacing.xl,
    overflow: "visible",
    position: "relative",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: ui.spacing.md },
        shadowOpacity: 0.1,
        shadowRadius: ui.radii.lg,
      },
    }),
  },

  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  titleColumn: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
    marginBottom: 4,
    lineHeight: 22,
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.85,
  },
  estadoBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ui.spacing.sm,
    paddingVertical: ui.spacing.xs,
    borderRadius: ui.radii.lg,
    alignSelf: "flex-start",
  },
  estadoText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  perforationWrap: {
    marginVertical: ui.spacing.lg - 2,
  },
  perforationLine: {
    borderTopWidth: ui.borders.width + 0.5,
    borderStyle: "dashed",
    opacity: 0.35,
  },

  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: ui.spacing.lg,
    width: "100%",
  },
  infoPillsColumn: {
    flex: 1,
    gap: ui.spacing.sm,
  },
  infoPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: ui.spacing.xs,
    gap: ui.spacing.xs,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ui.spacing.sm,
    paddingVertical: ui.spacing.xs,
    borderRadius: ui.radii.md,
    gap: ui.spacing.md,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
  },

  ctaWrap: {
    flexDirection: "column",
    alignItems: "stretch",
    width: "100%",
    gap: 0,
  },
  fullWidthBtn: {
    width: "100%",
    alignSelf: "stretch",
  },
  applyText: {
    color: Colors.cardTextDark,
    fontSize: 14,
    fontWeight: "800",
  },

  pendingBadge: {
    marginTop: ui.spacing.md,
    width: "100%",
    borderRadius: ui.radii.md,
    overflow: "hidden",
  },
  pendingBadgeGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: ui.spacing.xs + 2,
    paddingHorizontal: ui.spacing.md,
    borderRadius: ui.radii.md,
    borderWidth: ui.borders.width,
    gap: ui.spacing.xs + 2,
  },
  pendingBadgeIcon: {
    width: ui.radii.lg,
    height: ui.radii.lg,
    borderRadius: ui.radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  pendingBadgeText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  pendingDot: {
    width: ui.spacing.xs,
    height: ui.spacing.xs,
    borderRadius: ui.spacing.xs,
  },
});
