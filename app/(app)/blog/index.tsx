import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import BlogListItem from "@/src/modules/blog/components/BlogListItem";
import FeaturedItem from "@/src/modules/blog/components/FeaturedItem";
import { useBlogPosts } from "@/src/modules/blog/hooks/useBlogPosts";
import type { BlogPost } from "@/src/modules/blog/types/blog.types";
import { ui } from "@/src/themes/ui";
import { useRouter } from "expo-router";
import { MotiView, View } from "moti";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

export default function HybridBlogList() {
  const { colors } = useTheme();
  const router = useRouter();
  const { data: blogPosts } = useBlogPosts();

  const renderItem = ({ item, index }: { item: BlogPost; index: number }) => {
    if (index === 0) {
      return (
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 700 }}
          style={styles.featuredWrap}
        >
          <FeaturedItem
            item={item}
            onPress={() => router.push(`/blog/${item.id}`)}
          />
          <ThemedText type="title" tone="primary" style={styles.moreTitle}>
            Más artículos
          </ThemedText>
        </MotiView>
      );
    }

    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 100 }}
      >
        <BlogListItem
          item={item}
          onPress={() => router.push(`/blog/${item.id}`)}
        />
      </MotiView>
    );
  };

  return (
    <Screen>
      <FlatList
        data={blogPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <ThemedText type="caption" tone="secondary">
              Bienvenido a nuestro
            </ThemedText>
            <ThemedText type="title" color={colors.primaryLight}>
              Blog Médico
            </ThemedText>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 100,
  },
  header: {
    marginBottom: ui.spacing.xl,
  },
  featuredWrap: {
    marginBottom: ui.spacing.xxl,
  },
  moreTitle: {
    marginTop: ui.spacing.xxl,
  },
});
