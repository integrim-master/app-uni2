"use client";

import Badge from "@/src/components/shared/Badge";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { AppColors as Colors } from "@/src/themes/colors";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
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
  sucessRedeem,
  onRedeem,
  isPending = false,
  isLoadingRedeem,
}: Props) {
  const { colors } = useTheme();

  return (
    <Screen fullWidth={true}>
      <ScrollView showsVerticalScrollIndicator={false} className="">
        <View style={styles.heroWrap}>
          <Image
            source={{
              uri:
                benefit?.image ||
                "https://via.placeholder.com/600x400?text=No+Image",
            }}
            style={[styles.heroImage, isPending && { opacity: 0.6 }]}
            contentFit="cover"
            transition={800}
          />

          <LinearGradient
            colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.75)"]}
            style={StyleSheet.absoluteFillObject}
          />

          <View style={styles.heroContent}>
            {isPending ? (
              <Skeleton width={260} height={34} radius={10} colorMode="dark" />
            ) : (
              <Text style={styles.heroTitle} numberOfLines={2}>
                {benefit?.title}
              </Text>
            )}
          </View>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              shadowColor: colors.shadow || "#000",
            },
          ]}
        >
          <Badge
            text="BENEFICIO PREMIUM"
            variant="premium"
            size="small"
            icon="star"
            style={{ marginBottom: 24 }}
          />

          <ThemedText type="body" style={{ color: colors.text }}>
            Descripción
          </ThemedText>
          {isPending ? (
            <View style={{ gap: 10, marginBottom: 24 }}>
              <Skeleton height={16} radius={6} />
              <Skeleton height={16} width="90%" radius={6} />
              <Skeleton height={16} width="80%" radius={6} />
            </View>
          ) : (
            <ThemedText type="body" color={colors.textSecondary}>
              {benefit?.description}
            </ThemedText>
          )}

          <View style={styles.pillsRow}>
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
          {/* <PrimaryButton
            variant="primary"
            title="Redimir beneficio"
            textStyle={{
              color: Colors.cardText,
            }}
            onPress={() => onRedeem?.(benefit.id, benefit.title)}
            disabled={isLoadingRedeem || sucessRedeem}
            loading={isLoadingRedeem}
          /> */}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    height: 420,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroContent: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 40,
    textAlign: "center",
  },

  card: {
    marginTop: -40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },

  pillsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
    marginBottom: 32,
  },

  ctaWrap: {
    marginBottom: 16,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 18,
    borderRadius: 18,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  ctaText: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.cardText,
  },
});
