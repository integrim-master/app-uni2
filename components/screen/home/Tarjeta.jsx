import { View, Text, Animated, TextBase, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import { ChipIcon, DiamondIcon } from '../../Icons'
import { Colors, useColors } from '../../Colors'
import { useAuth } from '../../../context/AuthContext'
import ProgressBar from '../../ProgressBar'
import { TextContent, TextSubTitles, TextTiny, TextTitles } from '../../TextCustom'
import Logo from '../../../assets/images/logo-careme-black.png'
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


const { width } = Dimensions.get("window");

export function Tarjeta({
  membresia,
  dark,
  light,
  amountBenefits,
  countBenefits,
  nombre,
}) {
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

      {/* CONTENIDO */}
      <View className="justify-between">
        <View className="flex-row justify-between">
          <TextTitles
            className="uppercase font-bold"
            style={{ color: light }}
          >
            {membresia}
          </TextTitles>
          <Image source={Logo} className='w-48 h-10' resizeMode='cover'/>
        </View>
        <View>
          <ChipIcon color={"#F5CF86"} size={50} />
        </View>
        <View>
          <View className="flex-row items-center gap-3">
            <TextTiny className="text-white">Valido hasta</TextTiny>
            <TextContent className="text-white">01/07/2026</TextContent>
          </View>
          <TextTitles className="text-white">{nombre}</TextTitles>
        </View>
      </View>

      <View className="gap-3">
        <View className="flex-row justify-between">
          <TextContent className="text-white text-lg">
            Beneficios disponibles
          </TextContent>
          <TextSubTitles style={{ color: light }}>
            {countBenefits}/{amountBenefits}
          </TextSubTitles>
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
