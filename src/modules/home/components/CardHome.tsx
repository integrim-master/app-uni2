import ThemedText from "@/src/components/shared/themed-text";
import { Benefits } from "@/src/types/shared/Benefits.type";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logo from "../../../../assets/images/logo-careme-black.png";
import LogoWhite from "../../../../assets/images/logo-careme-white.png";
import { useTheme } from "../../../context/ThemeContext";
import { CardHomeSkeleton } from "./CardHomeSkeleton";
import { ProgressBar } from "./ProgressBar";

const { width } = Dimensions.get("window");

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

  const totalBenefits = benefits.reduce(
    (acc, benefit) => acc + benefit.allowed,
    0,
  );

  const usedBenefits = benefits.reduce((acc, benefit) => acc + benefit.used, 0);

  let gradient: string[];
  let titleColor: string;
  let bodyColor: string;
  let glowColor: string;
  let cardBg: string;

  if (isBlack) {
    gradient = colors.membershipBlackGradient;
    titleColor = colors.primary;
    bodyColor = colors.membershipBlackText || "#FFF";
    glowColor = colors.textDark ?? colors.primary;
    cardBg = colors.membershipBlackCard || colors.primaryLight;
  } else if (isSilver) {
    gradient = colors.membershipSilverGradient || [
      "#E3E3E3",
      "#BEBEBE",
      "#A7A7A7",
    ];
    titleColor = colors.membershipSilverText || "#A7A7A7";
    bodyColor = colors.membershipSilverText || "#A7A7A7";
    glowColor = titleColor;
    cardBg = colors.membershipSilverCard || "#F5F5F5";
  } else {
    gradient = colors.membershipGoldGradient;
    titleColor = colors.cardTextDark;
    bodyColor = colors.text;
    glowColor = colors.primaryLight ?? colors.primary;
    cardBg = colors.primaryLight;
  }

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const scale = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ scale }] }}>
      <View style={[styles.glowWrapper, { shadowColor: glowColor }]}>
        <View className="rounded-2xl overflow-hidden">
          <LinearGradient colors={gradient as any} style={styles.card}>
            {!isBlack && !isSilver && (
              <Animated.View
                pointerEvents="none"
                style={[
                  StyleSheet.absoluteFillObject,
                  { transform: [{ translateX }] },
                ]}
              >
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(255,255,255,0.18)",
                    "transparent",
                  ]}
                  start={{ x: 0, y: 0.3 }}
                  end={{ x: 1, y: 0.7 }}
                  style={{ flex: 1, width: "120%" }}
                />
              </Animated.View>
            )}

            <View className="flex-row justify-between items-center">
              <ThemedText
                type="title"
                style={{ textTransform: "uppercase", color: titleColor }}
              >
                {name}
              </ThemedText>

              <Image
                source={isBlack ? LogoWhite : Logo}
                className="w-36 h-8"
                resizeMode="contain"
              />
            </View>

            <ThemedText color={bodyColor}>Válido hasta 31/12/2025</ThemedText>

            <View className="gap-2">
              <View className="flex-row justify-between">
                <ThemedText type="semiBold" color={bodyColor}>
                  Beneficios disponibles
                </ThemedText>

                <Text style={{ color: bodyColor }}>
                  {usedBenefits}/{totalBenefits}
                </Text>
              </View>

              <ProgressBar
                value={usedBenefits}
                total={totalBenefits}
                background={isBlack ? "#222" : "#FFF"}
                fill={bodyColor}
              />
            </View>
          </LinearGradient>

          <View style={[styles.footer, { backgroundColor: cardBg }]}>
            <ThemedText type="semiBold" color={titleColor}>
              Te quedan {totalBenefits - usedBenefits} beneficios por usar
            </ThemedText>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  glowWrapper: {
    borderRadius: 24,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.4,
        shadowRadius: 26,
        shadowOffset: { width: 0, height: 1 },
      },
      android: {
        elevation: 28,
      },
    }),
  },
  card: {
    padding: 20,
    gap: 16,
    overflow: "hidden",
  },
  footer: {
    padding: 12,
    alignItems: "center",
  },
});
