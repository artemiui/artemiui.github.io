import mediaDataRaw from "./media_database.json";

export type MediaItem = {
  title: string;
  type: string;
  rating: string;
  genre?: string;
  started?: string;
  completed?: string;
  cover_link: string;
  properties?: Record<string, string | undefined>;
  body?: string;
  filename?: string;
  filepath?: string;
  [key: string]: any;
};

const EXCLUDED_PROPERTIES = new Set([
  "title",
  "filename",
  "filepath",
  "cover_link",
  "cover link",
  "body",
  "properties",
]);

export const mediaDatabase: MediaItem[] = (
  mediaDataRaw as unknown as Record<string, any>[]
).map((item) => {
  const type = item.type ? item.type.toLowerCase().trim() : "other";

  // Build the properties dictionary for modal and details view
  const properties: Record<string, string | undefined> = {};

  if (item.properties && typeof item.properties === "object") {
    for (const [k, v] of Object.entries(item.properties)) {
      if (v !== undefined && v !== null && String(v).trim() !== "" && !EXCLUDED_PROPERTIES.has(k)) {
        properties[k] = String(v).trim();
      }
    }
  }

  for (const [k, v] of Object.entries(item)) {
    if (v !== undefined && v !== null && String(v).trim() !== "" && !EXCLUDED_PROPERTIES.has(k)) {
      properties[k] = String(v).trim();
    }
  }

  return {
    ...item,
    title: item.title || "",
    type,
    rating: item.rating ? String(item.rating).trim() : "",
    genre: item.genre ? String(item.genre).trim() : "",
    started: item.started ? String(item.started).trim() : "",
    completed: item.completed ? String(item.completed).trim() : "",
    cover_link: item.cover_link || "",
    body: item.body || "",
    properties,
  };
});

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

// Get the single most recent completed/started entry
export function getLatestMediaItem(): MediaItem | null {
  let latestItem: MediaItem | null = null;
  let latestTime = 0;

  for (const item of mediaDatabase) {
    const time = parseMediaDate(item.completed || item.started);
    if (time > latestTime) {
      latestTime = time;
      latestItem = item;
    }
  }

  return latestItem || mediaDatabase.find((item) => !!item.cover_link) || mediaDatabase[0] || null;
}

// Generate dynamic sentence verb & noun for the latest item
export function getLatestItemSentence(type: string): { verb: string; noun: string } {
  const t = type.toLowerCase().trim();
  if (t === "movie") return { verb: "watched", noun: "movie" };
  if (t === "anime") return { verb: "watched", noun: "anime" };
  if (t === "game") return { verb: "played", noun: "game" };
  if (t === "manga") return { verb: "read", noun: "manga" };
  if (t === "light novel" || t === "book") return { verb: "read", noun: "book" };
  return { verb: "completed", noun: "entry" };
}
