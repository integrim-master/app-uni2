"use client";

import Badge from "@/src/components/shared/Badge";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { TabBarContext } from "@/src/context/TabBarContext";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import { Skeleton } from "moti/skeleton";
import React, { use } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import type { BenefitApiResponse } from "../types/benefits.types";

type Props = {
  benefit: BenefitApiResponse;
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
  const { setShowTabBar } = use(TabBarContext);

  useFocusEffect(() => {
    setShowTabBar(true);
    return () => {
      setShowTabBar(false);
    };
  });

  return (
    <Screen fullWidth>
      <View className="flex-1">
        <View className="relative w-full aspect-[3/3]">
          <Image
            source={{
              uri:
                benefit?.image ||
                "https://via.placeholder.com/600x400?text=No+Image",
            }}
            className="absolute inset-0 size-full"
            style={isPending ? { opacity: 0.6 } : undefined}
            contentFit="cover"
            transition={600}
          />
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
            <Text
              style={[styles.title, { color: colors.text }]}
              numberOfLines={3}
            >
              {benefit?.title}
            </Text>
          )}

          <View
            style={[
              styles.divider,
              { backgroundColor: colors.border || "rgba(0,0,0,0.06)" },
            ]}
          />

          <ThemedText
            type="body"
            style={[styles.sectionLabel, { color: colors.textSecondary }]}
          >
            Descripción
          </ThemedText>

          {isPending ? (
            <View className="mt-2 gap-2.5">
              <Skeleton height={14} radius={6} />
              <Skeleton height={14} width="90%" radius={6} />
              <Skeleton height={14} width="75%" radius={6} />
            </View>
          ) : (
            <ThemedText
              type="body"
              style={styles.description}
              color={colors.text}
            >
              {benefit?.description}
            </ThemedText>
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    marginTop: 8,
  },
});
