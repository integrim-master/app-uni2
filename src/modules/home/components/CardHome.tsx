import ThemedText from "@/src/components/shared/themed-text";
import { ui } from "@/src/themes/ui";
import { Benefits } from "@/src/types/shared/Benefits.type";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Platform, StyleSheet, View } from "react-native";
import Logo from "../../../../assets/images/logo-careme-black.png";
import LogoWhite from "../../../../assets/images/logo-careme-white.png";
import { useTheme } from "../../../context/ThemeContext";
import { CardHomeSkeleton } from "./CardHomeSkeleton";
import { ProgressBar } from "./ProgressBar";

interface CardHomeProps {
  name: string;
  benefits: Benefits[];
  isLoading?: boolean;
}

export function CardHome({ name, benefits, isLoading = false }: CardHomeProps) {
  const { colors } = useTheme();

  const isBlack = name.toLowerCase() === "black";
  const isSilver = name.toLowerCase() === "silver";

  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    if (!isBlack && !isSilver) {
      Animated.loop(
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 2800,
          useNativeDriver: true,
        }),
      ).start();
    }
  }, []);

  if (isLoading) {
    return <CardHomeSkeleton isBlack={isBlack} />;
  }

  const totalBenefits = benefits.reduce((acc, b) => acc + b.allowed, 0);
  const usedBenefits = benefits.reduce((acc, b) => acc + b.used, 0);
  const remaining = totalBenefits - usedBenefits;

  let gradient: readonly string[];
  let titleColor: string;
  let bodyColor: string;
  let glowColor: string;
  let chipColors: readonly string[];

  if (isBlack) {
    gradient = colors.membershipBlack;
    titleColor = colors.primaryLight;
    bodyColor = colors.membershipBlackText || "#FFF";
    glowColor = colors.textStrong ?? colors.primary;
    chipColors = ["#D4AF37", "#F4E4A6", "#B8860B"];
  } else if (isSilver) {
    gradient = colors.membershipSilver || ["#E3E3E3", "#BEBEBE", "#A7A7A7"];
    titleColor = "#3A3A3A";
    bodyColor = "#3A3A3A";
    glowColor = "#A7A7A7";
    chipColors = ["#C0C0C0", "#F5F5F5", "#8A8A8A"];
  } else {
    gradient = colors.membershipGold;
    titleColor = colors.cardText;
    bodyColor = colors.text;
    glowColor = colors.primaryLight ?? colors.primary;
    chipColors = ["#E6C36B", "#FBF0C4", "#C99A2E"];
  }

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-320, 320],
  });

  const scale = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });

  return (
    <Animated.View style={[styles.wrap, { opacity: fadeAnim, transform: [{ scale }] }]}>
      <View
        style={[
          styles.card,
          { shadowColor: glowColor },
          Platform.select({
            ios: {
              shadowOpacity: 0.35,
              shadowRadius: 22,
              shadowOffset: { width: 0, height: 8 },
            },
          }),
        ]}
      >
        <LinearGradient
          colors={gradient as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        {!isBlack && !isSilver && (
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              { transform: [{ translateX }] },
            ]}
          >
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,0.22)", "transparent"]}
              start={{ x: 0, y: 0.3 }}
              end={{ x: 1, y: 0.7 }}
              style={styles.shimmer}
            />
          </Animated.View>
        )}

        <View style={styles.inner}>
          <View style={styles.headerRow}>
            <ThemedText type="title" color={titleColor} style={styles.tierName}>
              {name}
            </ThemedText>

            <Image
              source={isBlack ? LogoWhite : Logo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <LinearGradient
            colors={chipColors as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.chip}
          />

          <View style={styles.stats}>
            <View style={styles.statsRow}>
              <ThemedText type="semiBold" color={bodyColor}>
                Beneficios usados
              </ThemedText>
              <ThemedText type="semiBold" color={bodyColor}>
                {usedBenefits}/{totalBenefits}
              </ThemedText>
            </View>

            <ProgressBar
              value={usedBenefits}
              total={totalBenefits}
              background={
                isBlack ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"
              }
              fill={titleColor}
            />

            <View style={styles.statsRow}>
              <ThemedText type="caption" color={bodyColor} style={styles.captionMuted}>
                Válido hasta 31/12/2025
              </ThemedText>
              <ThemedText type="caption" color={titleColor}>
                {remaining} disponibles
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
  },
  card: {
    width: "100%",
    aspectRatio: 5 / 3,
    borderRadius: ui.radii.xl,
    overflow: "hidden",
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
    padding: ui.spacing.xl,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  logo: {
    width: 110,
    height: 26,
  },
  shimmer: {
    flex: 1,
    width: "120%",
  },
  chip: {
    width: ui.tapTarget,
    height: ui.spacing.xxl,
    borderRadius: ui.radii.sm,
  },
  stats: {
    gap: ui.spacing.sm,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tierName: {
    textTransform: "uppercase",
  },
  captionMuted: {
    opacity: 0.8,
  },
});
