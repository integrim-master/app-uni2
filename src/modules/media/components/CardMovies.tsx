import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { CardMoviesProps } from "../types/movie";

const CARD_WIDTH = 230;
const CARD_HEIGHT = 140;

export default function CardMovies({
  item,
  onPress,
  onOpenOptions,
}: CardMoviesProps) {
  const { colors } = useTheme();

  const handlePress = () => {
    onPress ? onPress() : router.push("/video" as any);
  };

  return (
    <View>
      <Pressable style={styles.categoryCard} onPress={handlePress}>
        <Image source={item.image} style={styles.categoryImage} />
        <View style={styles.overlay} />
      </Pressable>

      <View style={styles.categoryTextContainer}>
        <View style={styles.titleRow}>
          <ThemedText type="subtitle">{item.title}</ThemedText>
          <Pressable
            style={styles.playButton}
            onPress={() => onOpenOptions?.(item)}
            hitSlop={ui.spacing.md}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={colors.primary}
            />
          </Pressable>
        </View>

        <ThemedText type="caption" tone="secondary">
          Faciales | 2h 22min
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: ui.radii.lg,
    overflow: "hidden",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  playButton: {
    borderRadius: ui.radii.pill,
    alignItems: "center",
    justifyContent: "center",
    minWidth: ui.tapTarget,
    minHeight: ui.tapTarget,
  },
  categoryTextContainer: {
    marginTop: ui.spacing.sm,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
