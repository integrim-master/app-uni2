export type CategoryType = "beneficios" | "tratamientos";

export interface FavoriteItem {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  image?: string;
  isFavorite?: boolean;
}
