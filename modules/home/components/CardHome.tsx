import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Logo from "../../../assets/images/logo-careme-black.png";
import { useTheme } from "../../../context/ThemeContext";

const { width } = Dimensions.get("window");

interface CardHomeProps {
  membresia: string;
  dark: string;
  light: string;
  amountBenefits: number;
  countBenefits: number;
  nombre: string;
}

interface ProgressBarProps {
  value: number;
  total: number;
  light: string;
  dark: string;
}

function ProgressBar({ value, total, light, dark }: ProgressBarProps) {
  const percentage = Math.min((value / total) * 100, 100);

  return (
    <View className="w-full h-full relative" style={{ backgroundColor: light }}>
      <Animated.View
        className="h-full rounded-full"
        style={{
          width: `${percentage}%`,
          backgroundColor: dark,
          borderRadius: 999,
        }}
      />
    </View>
  );
}

export function CardHome({
  membresia,
  dark,
  light,
  amountBenefits,
  countBenefits,
  nombre,
}: CardHomeProps) {
  const { colors } = useTheme();
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={{ position: "relative" }}>

      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          borderRadius: 20,
          backgroundColor: colors.primaryLight,
          opacity: 0.70,
          zIndex: -1,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: 55,
          elevation: 35,
        }}
      />


      <LinearGradient
        colors={[colors.primaryLight, colors.primary, '#D0993C']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          paddingHorizontal: 20,
          paddingVertical: 24,
          gap: 16,
          overflow: "hidden",
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.85,
          shadowRadius: 38,
          elevation: 30,
        }}
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [{ translateX }],
          }}
        >
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.35)", "transparent"]}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 1, y: 0.8 }}
            style={{ flex: 1, width: "120%" }}
          />
        </Animated.View>

        <View className="justify-between">
          <View className="flex-row justify-between">
            <Text
              className="uppercase font-bold text-4xl"
              style={{ color: colors.text }}
            >
              {membresia}
            </Text>

            <Image source={Logo} className="w-48 h-10" resizeMode="cover" />
          </View>

          <View>
            <View className="flex-row items-center gap-3">
              <Text className="text-sm" style={{ color: colors.cardTextDark }}>
                Válido hasta
              </Text>
              <Text className="text-base font-medium" style={{ color: colors.text }}>
                01/07/2026
              </Text>
            </View>
          </View>
        </View>

        <View className="gap-3">
          <View className="flex-row justify-between">
            <Text className="text-lg font-medium" style={{ color: colors.cardTextDark }}>
              Beneficios disponibles
            </Text>
            <Text className="text-lg font-semibold" style={{ color: colors.cardTextDark }}>
              {countBenefits}/{amountBenefits}
            </Text>
          </View>

          <View
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ borderColor: colors.primaryLight }}
          >
            <ProgressBar
              value={countBenefits}
              total={amountBenefits}
              light={'white'}
              dark={colors.cardTextDark}
            />
          </View>
        </View>
      </LinearGradient>


      <View
        style={{
          backgroundColor: colors.primaryLight,
          padding: 12,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          alignItems: 'center',
          marginTop: 0,

        }}
      >
        <Text className="text-sm" style={{ color: colors.cardTextDark }}>
          ¡Te quedan 3 beneficios por canjear
        </Text>
      </View>
    </View>
  );
}
