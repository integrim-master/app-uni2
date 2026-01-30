import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { CardMoviesProps } from "../types/movie";

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText type="subtitle" color={colors.text}>
            {item.title}
          </ThemedText>
          <Pressable
            style={styles.playButton}
            onPress={() => onOpenOptions?.(item)}
            hitSlop={10}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={colors.primary}
            />
          </Pressable>
        </View>

        <ThemedText type="caption" color={colors.textSecondary}>
          Faciales | 2h 22min
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    width: 230,
    height: 140,
    borderRadius: 16,
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
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryTextContainer: {
    marginTop: 8,
  },

  categoryTitle: {
    fontSize: 14,
    fontWeight: "800",
  },

  categorySubtitle: {
    fontSize: 11,
  },
});
