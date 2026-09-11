import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import Campana from "../../../../assets/images/campana.jpg";
import type { Promotion } from "../types/home.promotions.types";

type Props = {
  item: Promotion;
};

function openPromotion(link: string) {
  const url = link.startsWith("http") ? link : `https://${link}`;
  Linking.openURL(url).catch(() => {});
}

export function PromotionSlide({ item }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => openPromotion(item.link_promotion)}
      className="h-full w-full overflow-hidden rounded-3xl border"
      style={{
        backgroundColor: colors.backgroundElevated,
        borderColor: colors.border,
      }}
    >
      <Image
        source={item.image ? { uri: item.image } : Campana}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        transition={400}
      />

      <LinearGradient
        colors={["transparent", colors.shadow + "40", colors.shadow + "D1"]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <View className="flex-1 justify-end gap-2 p-4">
        <View className="flex-row items-center gap-2">
          <View
            className="rounded-full px-2 py-1"
            style={{ backgroundColor: colors.primary + "E6" }}
          >
            <ThemedText type="label" color={colors.cardText}>
              Promo
            </ThemedText>
          </View>
          {!!item.fecha_fin && (
            <ThemedText type="caption" color={colors.textMuted}>
              Hasta {item.fecha_fin}
            </ThemedText>
          )}
        </View>

        <View className="flex-row items-center justify-between gap-2">
          <ThemedText
            type="titleSm"
            color={colors.text}
            numberOfLines={2}
            style={{ flex: 1 }}
          >
            {item.title}
          </ThemedText>
          <Ionicons
            name="arrow-forward"
            size={16}
            color={colors.primaryLight}
          />
        </View>
      </View>
    </Pressable>
  );
}
