import Badge from "@/src/components/shared/Badge";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";
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
  isPending = false,
}: Props) {
  const { colors } = useTheme();

  const price = Number(benefit?.precio);
  const priceLabel =
    Number.isFinite(price) && price > 0
      ? `$${price.toLocaleString("es-CO")}`
      : "Incluido";

  const handleRedeem = () => {
    if (!benefit?.id || !onRedeem || isLoadingRedeem || sucessRedeem) return;
    onRedeem(benefit.id, benefit.title);
  };

  return (
    <Screen fullWidth safeArea edges={["bottom"]}>
      <View
        className="flex-1"
        style={{ backgroundColor: colors.background }}
      >
        <View
          className="relative w-full aspect-[3/3]"
          style={{ backgroundColor: colors.backgroundElevated }}
        >
          {benefit?.image ? (
            <Image
              source={{ uri: benefit.image }}
              className="absolute inset-0 size-full"
              style={isPending ? { opacity: 0.6 } : undefined}
              contentFit="cover"
              transition={200}
            />
          ) : null}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.55)"]}
            style={StyleSheet.absoluteFillObject}
          />
        </View>

        <View
          className="flex-1 -mt-7 rounded-t-[28px] px-6 pt-6 pb-8"
          style={{ backgroundColor: colors.card }}
        >
          <Badge
            text="Beneficio premium"
            variant="premium"
            size="small"
            icon="star"
            style={styles.badge}
          />

          {isPending ? (
            <Skeleton width={220} height={28} radius={8} colorMode="dark" />
          ) : (
            <ThemedText type="title" numberOfLines={3}>
              {benefit?.title}
            </ThemedText>
          )}

          <View
            style={[
              styles.divider,
              { backgroundColor: colors.border || "rgba(0,0,0,0.06)" },
            ]}
          />

          <ThemedText type="label" tone="secondary">
            Descripción
          </ThemedText>

          {isPending ? (
            <View className="mt-2 gap-2.5">
              <Skeleton height={14} radius={6} colorMode="dark" />
              <Skeleton height={14} width="90%" radius={6} colorMode="dark" />
              <Skeleton height={14} width="75%" radius={6} colorMode="dark" />
            </View>
          ) : (
            <View style={styles.descriptionWrap}>
              <ThemedText type="body">{benefit?.description}</ThemedText>
            </View>
          )}

          <View className="mt-6 flex-row gap-2">
            <Badge
              text="Diciembre"
              variant="info"
              icon="schedule"
              size="small"
            />
            <Badge
              text="Disponible"
              variant="success"
              icon="check-circle"
              size="small"
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  badge: {
    marginBottom: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 20,
  },
  descriptionWrap: {
    marginTop: 8,
  },
});
