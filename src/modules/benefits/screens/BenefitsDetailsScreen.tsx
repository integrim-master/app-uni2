import Badge from "@/src/components/shared/Badge";
import PrimaryButton from "@/src/components/shared/PrimaryButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import type { BenefitApiResponse } from "../types/benefits.types";

type Props = {
  benefit?: BenefitApiResponse;
  onRedeem?: (id: string, title_prod: string) => void;
  isPending?: boolean;
  isLoadingRedeem?: boolean;
  sucessRedeem?: boolean;
};

export default function BenefitsDetailsScreen({
  benefit,
  onRedeem,
  isPending = false,
  isLoadingRedeem = false,
  sucessRedeem = false,
}: Props) {
  const { colors } = useTheme();

  const priceLabel =
    benefit?.precio != null && benefit.precio > 0
      ? `$${benefit.precio.toLocaleString("es-CO")}`
      : "Incluido";

  const handleRedeem = () => {
    if (!benefit?.id || !onRedeem || isLoadingRedeem || sucessRedeem) return;
    onRedeem(benefit.id, benefit.title);
  };

  return (
    <Screen fullWidth safeArea edges={["bottom"]}>
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          <View
            style={[
              styles.hero,
              { backgroundColor: colors.backgroundElevated },
            ]}
          >
            {benefit?.image ? (
              <Image
                source={{ uri: benefit.image }}
                style={[
                  styles.heroImage,
                  isPending ? styles.heroImagePending : undefined,
                ]}
                contentFit="cover"
                transition={200}
              />
            ) : (
              <View style={styles.heroFallback}>
                <MaterialIcons
                  name="card-giftcard"
                  size={48}
                  color={colors.primaryLight}
                />
              </View>
            )}

            <LinearGradient
              colors={[
                "rgba(0,0,0,0.45)",
                "rgba(0,0,0,0.2)",
                "rgba(0,0,0,0.55)",
                colors.background,
              ]}
              locations={[0, 0.25, 0.65, 1]}
              style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.heroCenter}>
              {isPending ? (
                <Skeleton
                  width={220}
                  height={30}
                  radius={ui.radii.sm}
                  colorMode="dark"
                />
              ) : (
                <ThemedText
                  type="display"
                  tone="inverse"
                  align="center"
                  numberOfLines={3}
                  style={styles.heroTitle}
                >
                  {benefit?.title}
                </ThemedText>
              )}
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.metaRow}>
              {isPending ? (
                <Skeleton
                  width={96}
                  height={28}
                  radius={ui.radii.pill}
                  colorMode="dark"
                />
              ) : (
                <Badge
                  text={priceLabel}
                  variant="default"
                  size="small"
                  icon="attach-money"
                />
              )}

              <Badge
                text={sucessRedeem ? "Redimido" : "Disponible"}
                variant={sucessRedeem ? "neutral" : "success"}
                size="small"
                icon="check-circle"
              />
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />

            <ThemedText type="label" tone="secondary">
              Descripción
            </ThemedText>

            {isPending ? (
              <View style={styles.skeletonCopy}>
                <Skeleton height={14} radius={ui.radii.sm} colorMode="dark" />
                <Skeleton
                  height={14}
                  width="92%"
                  radius={ui.radii.sm}
                  colorMode="dark"
                />
                <Skeleton
                  height={14}
                  width="78%"
                  radius={ui.radii.sm}
                  colorMode="dark"
                />
              </View>
            ) : (
              <ThemedText type="body" tone="secondary">
                {benefit?.description || "Sin descripción disponible."}
              </ThemedText>
            )}

            <View
              style={[
                styles.note,
                {
                  backgroundColor: colors.backgroundSurface,
                  borderColor: colors.border,
                },
              ]}
            >
              <MaterialIcons
                name="info-outline"
                size={18}
                color={colors.textAccent}
              />
              <ThemedText type="caption" tone="muted" style={styles.noteText}>
                Al redimir, tu asesor confirmará el beneficio y te indicará los
                siguientes pasos.
              </ThemedText>
            </View>
          </View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
            },
          ]}
        >
          <PrimaryButton
            title={sucessRedeem ? "Beneficio redimido" : "Redimir beneficio"}
            onPress={handleRedeem}
            loading={isLoadingRedeem}
            disabled={isPending || !benefit?.id || sucessRedeem}
            variant="primary"
            size="md"
            style={styles.cta}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: ui.spacing.xl,
  },
  hero: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  heroImagePending: {
    opacity: 0.6,
  },
  heroFallback: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  heroCenter: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: ui.spacing.xl,
    paddingTop: ui.spacing.xxl,
    gap: ui.spacing.md,
  },
  heroTitle: {
    width: "100%",
  },
  body: {
    paddingHorizontal: ui.spacing.lg,
    gap: ui.spacing.md,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
  divider: {
    height: ui.borders.hairline,
    marginVertical: ui.spacing.sm,
  },
  skeletonCopy: {
    gap: ui.spacing.sm,
  },
  note: {
    marginTop: ui.spacing.sm,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: ui.spacing.md,
    padding: ui.spacing.lg,
    borderRadius: ui.radii.lg,
    borderWidth: ui.borders.width,
  },
  noteText: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: ui.spacing.lg,
    paddingTop: ui.spacing.lg,
    paddingBottom: ui.spacing.lg,
    borderTopWidth: ui.borders.hairline,
  },
  cta: {
    width: "100%",
  },
});
