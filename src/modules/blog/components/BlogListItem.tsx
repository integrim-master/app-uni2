import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import type { BlogPost } from "../types/blog.types";

const THUMB = 90;

type Props = {
  item: BlogPost;
  onPress?: () => void;
};

export default function BlogListItem({ item, onPress }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} style={styles.rowPress}>
      <View style={styles.row}>
        <Image
          source={{ uri: item.image }}
          style={styles.thumb}
          contentFit="cover"
        />
        <View style={styles.copy}>
          <ThemedText
            type="label"
            color={colors.secondary}
            style={styles.category}
          >
            {item.category}
          </ThemedText>
          <ThemedText type="subtitle" numberOfLines={2} style={styles.title}>
            {item.title}
          </ThemedText>
          <ThemedText type="caption" tone="secondary">
            {item.date} • 5 min lectura
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rowPress: {
    marginBottom: ui.spacing.lg,
    paddingHorizontal: ui.spacing.sm,
    minHeight: ui.tapTarget,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  thumb: {
    width: THUMB,
    height: THUMB,
    borderRadius: ui.radii.xl,
  },
  copy: {
    flex: 1,
    marginLeft: ui.spacing.lg,
  },
  category: {
    marginBottom: ui.spacing.xs,
  },
  title: {
    marginBottom: ui.spacing.xs,
  },
});
