/**
 * Normaliza un string eliminando tildes, convirtiendo a minúsculas y haciendo trim
 * Útil para comparaciones y búsquedas sin importar acentos o mayúsculas
 */
export function normalizeString(str: string | undefined | null): string {
  console.log("Normalizando:", str);
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function formatDateToText(dateStr?: string | null): string {
  if (!dateStr) return "";

  const sep = dateStr.includes("-") ? "-" : dateStr.includes("/") ? "/" : null;
  if (sep) {
    const parts = dateStr.split(sep).map((p) => p.trim());
    if (parts.length === 3) {
      let day = parts[0];
      let month = parts[1];
      let year = parts[2];

      if (day.length === 4) {
        year = parts[0];
        month = parts[1];
        day = parts[2];
      }

      const mIndex = parseInt(month, 10) - 1;
      const monthName = MONTHS_ES[mIndex] || month;
      const d = parseInt(day, 10);
      return `${d} de ${monthName} de ${year}`;
    }
  }

  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    const d = parsed.getDate();
    const monthName = MONTHS_ES[parsed.getMonth()] || "";
    const y = parsed.getFullYear();
    return `${d} de ${monthName} de ${y}`;
  }

  return dateStr;
}
