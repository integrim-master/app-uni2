import ThemedText from "@/src/components/shared/themed-text";
import { Benefits } from "@/src/types/shared/Benefits.type";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logo from "../../../../assets/images/logo-careme-black.png";
import LogoWhite from "../../../../assets/images/logo-careme-white.png";
import { useTheme } from "../../../context/ThemeContext";

const { width } = Dimensions.get("window");

interface ProgressBarProps {
  value: number;
  total: number;
  background: string;
  fill: string;
}

function ProgressBar({ value, total, background, fill }: ProgressBarProps) {
  const percentage = Math.min((value / total) * 100, 100);

  return (
    <View
      style={{
        height: 6,
        borderRadius: 999,
        backgroundColor: background,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${percentage}%`,
          backgroundColor: fill,
        }}
      />
    </View>
  );
}

interface CardHomeProps {
  name: string;
  benefits: Benefits[];
}

export function CardHome({ name, benefits }: CardHomeProps) {
  const { colors } = useTheme();

  const isBlack = name.toLowerCase() === "black";

  const gradient = isBlack
    ? colors.membershipBlackGradient
    : colors.membershipGoldGradient;

  const titleColor = isBlack ? colors.membershipBlackText : colors.text;

  const totalBenefits = benefits.reduce(
    (acc, benefit) => acc + benefit.allowed,
    0
  );

  const usedBenefits = benefits.reduce((acc, benefit) => acc + benefit.used, 0);

  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2800,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      <View className="rounded-2xl overflow-hidden">
        <LinearGradient
          colors={gradient as any}
          style={{
            padding: 20,
            gap: 16,
            overflow: "hidden",
          }}
        >
          <Animated.View
            pointerEvents="none"
            style={{
              ...StyleSheet.absoluteFillObject,
              transform: [{ translateX }],
            }}
          >
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,0.25)", "transparent"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 1, y: 0.8 }}
              style={{
                flex: 1,
                width: "120%",
              }}
            />
          </Animated.View>
          <View className="flex-row justify-between items-center">
            <ThemedText
              type="title"
              style={{
                textTransform: "uppercase",
                color: titleColor,
                width: 70,
              }}
            >
              {name}
            </ThemedText>

            <Image
              source={isBlack ? LogoWhite : Logo}
              className="w-36 h-8"
              resizeMode="contain"
            />
          </View>
          <ThemedText>
            Válido hasta <ThemedText>31/12/2025</ThemedText>
          </ThemedText>

          <View className="gap-2">
            <View className="flex-row justify-between">
              <ThemedText color={colors.primaryLight}>
                Beneficios disponibles
              </ThemedText>

              <Text style={{ color: colors.primaryLight }}>
                {usedBenefits}/{totalBenefits}
              </Text>
            </View>

            <ProgressBar
              value={usedBenefits}
              total={totalBenefits}
              background={isBlack ? "#222" : "#FFF"}
              fill={isBlack ? colors.primary : colors.cardTextDark}
            />
          </View>
        </LinearGradient>
        <View
          style={{
            backgroundColor: isBlack
              ? colors.membershipBlackCard || colors.primaryLight
              : colors.primaryLight,
            padding: 12,
            alignItems: "center",
          }}
        >
          <ThemedText>
            Te quedan {totalBenefits - usedBenefits} beneficios por usar
          </ThemedText>
        </View>
      </View>
    </Animated.View>
  );
}
