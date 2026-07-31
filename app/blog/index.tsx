import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import BlogListItem from "@/src/modules/blog/components/BlogListItem";
import FeaturedItem from "@/src/modules/blog/components/FeaturedItem";
import { useBlogPosts } from "@/src/modules/blog/hooks/useBlogPosts";
import type { BlogPost } from "@/src/modules/blog/types/blog.types";
import { useRouter } from "expo-router";
import { MotiView, View } from "moti";
import React from "react";
import { FlatList } from "react-native";

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
          className="mb-12"
        >
          <FeaturedItem
            item={item}
            onPress={() => router.push(`/blog/${item.id}`)}
          />
          <ThemedText
            type="title"
            style={{ marginTop: 40 }}
            color={colors.primaryLight}
          >
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
        className=" px-2"
      >
        <BlogListItem
          item={item}
          onPress={() => router.push(`/blog/${item.id}`)}
        />
      </MotiView>
    );
  };

  return (
    <Screen fullWidth>
      <FlatList
        data={blogPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="mb-8 px-2">
            <ThemedText
              style={{
                color: colors.textSecondary,
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Bienvenido a nuestro
            </ThemedText>
            <ThemedText type="title" color={colors.primaryLight}>
              Blog{" "}
              <ThemedText type="title" style={{ fontWeight: "300" }}>
                Médico
              </ThemedText>
            </ThemedText>
          </View>
        )}
      />
    </Screen>
  );
}
