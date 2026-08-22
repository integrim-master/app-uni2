import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Linking,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Campana from "../../../../assets/images/campana.jpg";
import type { Promotion } from "../types/home.promotions.types";

type Props = {
  item: Promotion;
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
};

function openPromotion(link: string) {
  const url = link.startsWith("http") ? link : `https://${link}`;
  Linking.openURL(url).catch(() => {});
}

export function PromotionSlide({ item, width, height, style }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => openPromotion(item.link_promotion)}
      style={[
        styles.card,
        {
          width,
          height,
          backgroundColor: colors.backgroundElevated,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <Image
        source={item.image ? { uri: item.image } : Campana}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        transition={400}
      />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.82)"]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        <View style={styles.metaRow}>
          <View
            style={[styles.chip, { backgroundColor: colors.primary + "E6" }]}
          >
            <ThemedText type="label" color={colors.cardText}>
              Promo
            </ThemedText>
          </View>
          {!!item.fecha_fin && (
            <ThemedText type="caption" color="rgba(255,255,255,0.75)">
              Hasta {item.fecha_fin}
            </ThemedText>
          )}
        </View>

        <View style={styles.titleRow}>
          <ThemedText type="titleSm" tone="inverse" numberOfLines={2}>
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

const styles = StyleSheet.create({
  card: {
    borderRadius: ui.radii.xl,
    overflow: "hidden",
    borderWidth: ui.borders.hairline,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    padding: ui.spacing.lg,
    gap: ui.spacing.sm,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: ui.spacing.sm,
  },
  chip: {
    paddingHorizontal: ui.spacing.sm,
    paddingVertical: ui.spacing.xs,
    borderRadius: ui.radii.pill,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ui.spacing.sm,
  },
});
