import TabBar from "@/src/components/shared/TabBar";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { ui } from "@/src/themes/ui";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FavoriteCard } from "../components/FavoriteCard";
import { useFavorites } from "../hooks/useFavorites";
import type { CategoryType } from "../types/favorites.types";

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const {
    favorites,
    selectedCategory,
    setSelectedCategory,
    animatingId,
    toggleFavorite,
  } = useFavorites();

  const tabOptions = [
    { key: "todos", label: "Todos" },
    { key: "beneficios", label: "Beneficios" },
    { key: "tratamientos", label: "Tratamientos" },
  ];

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="favorite-border" size={80} color={colors.border} />
      <View style={styles.emptyCopy}>
        <ThemedText type="title">No hay favoritos</ThemedText>
        <ThemedText type="caption" tone="secondary" align="center">
          {selectedCategory === "todos"
            ? "Aún no has agregado favoritos"
            : `No tienes ${selectedCategory} favoritos`}
        </ThemedText>
      </View>
    </View>
  );

  return (
    <Screen>
      <View style={styles.tabContainer}>
        <TabBar
          options={tabOptions}
          activeTab={selectedCategory}
          setActiveTab={(tab) =>
            setSelectedCategory(tab as CategoryType | "todos")
          }
        />
      </View>

      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <FavoriteCard
            item={item}
            onToggleFavorite={() => toggleFavorite(item.id)}
            isAnimating={animatingId === item.id}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: ui.spacing.xl,
    marginBottom: ui.spacing.lg,
    marginTop: ui.spacing.lg,
  },
  listContent: {
    paddingHorizontal: ui.spacing.xl,
    paddingBottom: ui.spacing.xl,
    gap: ui.spacing.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: ui.spacing.xxl,
    gap: ui.spacing.lg,
  },
  emptyCopy: {
    gap: ui.spacing.sm,
    alignItems: "center",
  },
});
