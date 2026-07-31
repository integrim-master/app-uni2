import type { FavoriteItem } from "../types/favorites.types";

/** Datos locales hasta que exista endpoint de favoritos. */
export const MOCK_FAVORITES: FavoriteItem[] = [
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
