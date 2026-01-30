import { Screen } from "@/src/components/shared/Screen";
import ThemedText from "@/src/components/shared/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FavoriteCard } from "../components/FavoriteCard";
import { CategoryType, FavoriteItem } from "../types/favorites.types";

const FAVORITES_DATA: FavoriteItem[] = [
  {
    id: "1",
    title: "Limpieza Facial Profunda",
    description: "Tratamiento completo para tu piel",
    category: "beneficios",
  },
  {
    id: "2",
    title: "Masaje Relajante",
    description: "60 minutos de relajación",
    category: "tratamientos",
  },
  {
    id: "3",
    title: "Consulta Nutricional",
    description: "Plan personalizado",
    category: "beneficios",
  },
];

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "todos">("todos");

  const tabOptions = [
    { key: "todos", label: "Todos" },
    { key: "beneficios", label: "Beneficios" },
    { key: "tratamientos", label: "Tratamientos" },
  ];

  const filteredData =
    selectedCategory === "todos"
      ? FAVORITES_DATA
      : FAVORITES_DATA.filter((item) => item.category === selectedCategory);

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
     
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <FavoriteCard item={item} />}
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
