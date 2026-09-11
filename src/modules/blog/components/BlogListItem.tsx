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
  const categoryName = item.category?.[0]?.name;

  return (
    <Pressable onPress={onPress} style={styles.rowPress}>
      <View style={styles.row}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.thumb}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.thumb, { backgroundColor: colors.border }]} />
        )}
        <View style={styles.copy}>
          {categoryName ? (
            <ThemedText type="subtitle" color={colors.primary}>
              {categoryName}
            </ThemedText>
          ) : null}
          <ThemedText type="subtitle" numberOfLines={4}>
            {item.title}
          </ThemedText>
          {/* {item.date ? (
            <ThemedText type="caption" tone="secondary">
              {item.date}
            </ThemedText>
          ) : null} */}
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
