import Badge from "@/src/components/shared/Badge";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { Image } from "expo-image";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import type { BlogPost } from "../types/blog.types";

const FEATURED_HEIGHT = 400;

type Props = {
  item: BlogPost;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function FeaturedItem({ item, onPress, style }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} style={style as any}>
      <View style={[styles.container, { backgroundColor: colors.card }]}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          contentFit="cover"
        />
        <View
          style={[
            styles.overlay,
            { backgroundColor: colors.backgroundSurface + "80" },
          ]}
        >
          <Badge
            text={item.category}
            variant="white"
            size="small"
            showIcon={false}
            style={styles.badge}
          />

          <ThemedText type="display">{item.title}</ThemedText>
          <ThemedText type="body" tone="secondary" numberOfLines={2} style={styles.summary}>
            {item.summary}
          </ThemedText>
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
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "flex-end",
    padding: ui.spacing.xl,
  },
  badge: {
    marginBottom: ui.spacing.md,
  },
  summary: {
    marginTop: ui.spacing.md,
  },
});
