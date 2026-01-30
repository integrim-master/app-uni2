export function parseDateString(dateStr?: string | null): Date | null {
  if (!dateStr) return null;
  const s = String(dateStr).trim();
  const sep = s.includes("-") ? "-" : s.includes("/") ? "/" : null;
  if (sep) {
    const parts = s.split(sep).map((p) => p.trim());
    if (parts.length === 3) {
      let day = parts[0];
      let month = parts[1];
      let year = parts[2];
      // YYYY-MM-DD
      if (day.length === 4) {
        year = parts[0];
        month = parts[1];
        day = parts[2];
      }
      const dd = parseInt(day, 10);
      const mm = parseInt(month, 10) - 1;
      const yy = parseInt(year, 10);
      if (!isNaN(dd) && !isNaN(mm) && !isNaN(yy)) {
        return new Date(yy, mm, dd);
      }
    }
  }
  const parsed = new Date(s);
  if (!isNaN(parsed.getTime())) return parsed;
  return null;
}
