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

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return "Ahora";
  } else if (diffMins < 60) {
    return `Hace ${diffMins}m`;
  } else if (diffHours < 24) {
    return `Hace ${diffHours}h`;
  } else if (diffDays === 1) {
    return "Ayer";
  } else if (diffDays < 7) {
    return `Hace ${diffDays} días`;
  } else {
    return date.toLocaleDateString();
  }
}
