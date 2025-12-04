import { LinearGradient } from "expo-linear-gradient"
import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Logo from '../../../assets/images/logo-careme-black.png'
import { ChipIcon } from '../../../components/Icons'

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
          backgroundColor: dark,
          width: `${percentage}%`,
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
    outputRange: [-width, width], // se mueve de izquierda a derecha
  });

  return (
    <View
      className="rounded-3xl px-8 py-6 gap-4 overflow-hidden"
      style={{ backgroundColor: "#171717" }}
    >
      {/* Reflejo */}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.2)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>

      <View className="justify-between">
        <View className="flex-row justify-between">
          <Text
            className="uppercase font-bold text-xl"
            style={{ color: light }}
          >
            {membresia}
          </Text>
          <Image source={Logo} className='w-48 h-10' resizeMode='cover'/>
        </View>
        <View>
          <ChipIcon color={"#F5CF86"} size={50} />
        </View>
        <View>
          <View className="flex-row items-center gap-3">
            <Text className="text-white text-sm">Válido hasta</Text>
            <Text className="text-white text-base font-medium">01/07/2026</Text>
          </View>
          <Text className="text-white text-xl font-bold">{nombre}</Text>
        </View>
      </View>

      <View className="gap-3">
        <View className="flex-row justify-between">
          <Text className="text-white text-lg font-medium">
            Beneficios disponibles
          </Text>
          <Text className="text-lg font-semibold" style={{ color: light }}>
            {countBenefits}/{amountBenefits}
          </Text>
        </View>
        <View>
          <View
            className="w-full h-3 rounded-full overflow-hidden border-hairline"
            style={{ borderColor: light }}
          >
            <ProgressBar
              value={countBenefits}
              total={amountBenefits}
              light="#EEE"
              dark="#D4AF37"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
