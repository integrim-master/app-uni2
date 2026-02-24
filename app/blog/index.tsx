import { BackButton } from "@/src/components/shared/BackButton";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import BlogListItem from "@/src/modules/blog/BlogListItem";
import FeaturedItem from "@/src/modules/blog/FeaturedItem";
import { useRouter } from "expo-router";
import { MotiView, View } from "moti";
import React from "react";
import { Dimensions, FlatList } from "react-native";

const { width } = Dimensions.get("window");

const blogPosts = [
  {
    id: 1,
    title: "Rinoplastia Ultrasónica: El futuro de la cirugía facial",
    summary:
      "Resultados más naturales con una recuperación un 50% más rápida gracias a la tecnología piezoeléctrica.",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
    category: "Cirugía Facial",
    date: "Hoy",
    featured: true,
  },
  {
    id: 2,
    title: "Postoperatorio: Guía de éxito",
    summary: "Cuidados esenciales tras una lipoescultura de alta definición.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    category: "Cuidados",
    date: "24 Feb",
  },
  {
    id: 3,
    title: "Bioestimuladores de Colágeno",
    summary: "La nueva era de rejuvenecimiento sin entrar a quirófano.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    category: "Dermatología",
    date: "22 Feb",
  },
];

export default function HybridBlogList() {
  const { colors } = useTheme();
  const router = useRouter();

  const renderItem = ({
    item,
    index,
  }: {
    item: (typeof blogPosts)[0];
    index: number;
  }) => {
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
    <Screen safeArea={true} leftButton={<BackButton iconName="chevron-back" />}>
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
