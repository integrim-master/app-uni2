import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { FavoriteCard } from "@/src/modules/favorites/components/FavoriteCard";
import { CategoryType, FavoriteItem } from "@/src/modules/favorites/types/favorites.types";
import TabBar from "@/src/components/shared/TabBar";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const FAVORITES_DATA: FavoriteItem[] = [
  {
    id: "1",
    title: "Limpieza Facial Profunda",
    description: "Tratamiento completo para tu piel",
    category: "beneficios",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Masaje Relajante",
    description: "60 minutos de relajación",
    category: "tratamientos",
    isFavorite: true,
  },
  {
    id: "3",
    title: "Consulta Nutricional",
    description: "Plan personalizado",
    category: "beneficios",
    isFavorite: true,
  },
];

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "todos">("todos");
  const [favorites, setFavorites] = useState<FavoriteItem[]>(FAVORITES_DATA);
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setAnimatingId(id);
    setFavorites((prevFavorites) =>
      prevFavorites.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
    setTimeout(() => setAnimatingId(null), 400);
  };

  const tabOptions = [
    { key: "todos", label: "Todos" },
    { key: "beneficios", label: "Beneficios" },
    { key: "tratamientos", label: "Tratamientos" },
  ];

  const filteredData =
    selectedCategory === "todos"
      ? favorites
      : favorites.filter((item) => item.category === selectedCategory);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="favorite-border" size={80} color={colors.border} />
      <ThemedText type="title" style={styles.emptyTitle}>
        No hay favoritos
      </ThemedText>
      <ThemedText type="caption" color={colors.textSecondary} style={styles.emptyText}>
        {selectedCategory === "todos"
          ? "Aún no has agregado favoritos"
          : `No tienes ${selectedCategory} favoritos`}
      </ThemedText>
    </View>
  );

  return (
    <Screen>
      <View style={styles.tabContainer}>
        <TabBar
          options={tabOptions}
          activeTab={selectedCategory}
          setActiveTab={(tab) => setSelectedCategory(tab as CategoryType | "todos")}
        />
      </View>

      <FlatList
        data={filteredData}
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
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: "center",
  },
});
