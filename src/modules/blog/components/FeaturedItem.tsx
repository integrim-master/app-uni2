import Badge from "@/src/components/shared/Badge";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import type { BlogPost } from "../types/blog.types";

const FEATURED_HEIGHT = 380;

type Props = {
  item: BlogPost;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function FeaturedItem({ item, onPress, style }: Props) {
  const categoryName = item.category?.[0]?.name;
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} style={style as any}>
      <View style={styles.container}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.image, styles.imageFallback]} />
        )}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.75)"]}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.overlay}>
          {categoryName ? (
            <Badge
              text={categoryName}
              variant="white"
              size="xs"
              showIcon={false}
            />
          ) : null}
          <ThemedText type="title" color={colors.textStrong} numberOfLines={4}>
            {item.title}
          </ThemedText>
          {/* {item.summary ? (
            <ThemedText
              type="body"
              tone="inverse"
              numberOfLines={2}
              style={styles.summary}
            >
              {item.summary}
            </ThemedText>
          ) : null} */}
          {/* {item.date ? (
            <ThemedText type="caption" tone="inverse" style={styles.date}>
              {item.date}
            </ThemedText>
          ) : null} */}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: FEATURED_HEIGHT,
    overflow: "hidden",
    borderRadius: ui.radii.xl,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageFallback: {
    backgroundColor: "#CBD5E1",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: ui.spacing.xl,
  },
  badge: {
    marginBottom: ui.spacing.md,
    alignSelf: "flex-start",
  },
  summary: {
    marginTop: ui.spacing.md,
    opacity: 0.9,
  },
  date: {
    marginTop: ui.spacing.sm,
    opacity: 0.8,
  },
});
