import mediaDataRaw from "./media_database.json";

export type MediaItem = {
  title: string;
  filename?: string;
  filepath?: string;
  type: string;
  rating: string;
  genre?: string;
  started?: string;
  completed?: string;
  cover_link: string;
  properties?: Record<string, string | undefined>;
  body?: string;
};

export const mediaDatabase: MediaItem[] = (
  mediaDataRaw as unknown as MediaItem[]
).map((item) => ({
  ...item,
  type: item.type ? item.type.toLowerCase().trim() : "other",
}));

export function getMediaStats() {
  const total = mediaDatabase.length;
  const counts: Record<string, number> = {};
  mediaDatabase.forEach((item) => {
    const t = item.type || "other";
    counts[t] = (counts[t] || 0) + 1;
  });
  return { total, counts };
}

// Parse date strings (e.g. DD-MM-YYYY, YYYY-MM-DD) into timestamp
export function parseMediaDate(dateStr?: string): number {
  if (!dateStr || !dateStr.trim()) return 0;
  const clean = dateStr.trim();

  // Pattern DD-MM-YYYY (e.g. 08-07-2025)
  const ddmmyyyy = clean.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ddmmyyyy) {
    const [, day, month, year] = ddmmyyyy;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).getTime();
  }

  // Pattern YYYY-MM-DD
  const yyyymmdd = clean.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (yyyymmdd) {
    return new Date(clean).getTime();
  }

  const parsed = Date.parse(clean);
  return isNaN(parsed) ? 0 : parsed;
}
