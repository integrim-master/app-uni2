/**
 * Normaliza un string eliminando tildes, convirtiendo a minúsculas y haciendo trim
 * Útil para comparaciones y búsquedas sin importar acentos o mayúsculas
 */
export function normalizeString(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}
