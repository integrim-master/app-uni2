import { useMemo, useState } from "react";
import { MOCK_FAVORITES } from "../mocks/mockFavorites";
import type { CategoryType, FavoriteItem } from "../types/favorites.types";

/**
 * Estado local de favoritos (mocks).
 * Cuando exista API: reemplazar por useAuthQuery + mutation en services/.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(MOCK_FAVORITES);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | "todos"
  >("todos");
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const filteredFavorites = useMemo(
    () =>
      selectedCategory === "todos"
        ? favorites
        : favorites.filter((item) => item.category === selectedCategory),
    [favorites, selectedCategory],
  );

  const toggleFavorite = (id: string) => {
    setAnimatingId(id);
    setFavorites((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item,
      ),
    );
    setTimeout(() => setAnimatingId(null), 400);
  };

  return {
    favorites: filteredFavorites,
    selectedCategory,
    setSelectedCategory,
    animatingId,
    toggleFavorite,
  };
}
