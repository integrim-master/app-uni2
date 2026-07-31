import TabBar from "@/src/components/shared/TabBar";
import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
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
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 18,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 16,
  },
  emptyCopy: {
    gap: 8,
    alignItems: "center",
  },
});
