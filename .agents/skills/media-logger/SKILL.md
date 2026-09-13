---
name: media-logger
description: Dedicated workspace skill for logging, cataloging, formatting, and updating media entries (movies, anime, games, manga, books) in lib/media_database.json.
---

# Media Logger Skill

This skill guides the agent on how to manage, log, and maintain media entries in Artem's personal website.

## Media Database Specifications

- **Database File**: `lib/media_database.json`
- **Data Model**: Defined in `lib/mediaService.ts`
- **Frontend Views**:
  - `app/media/page.tsx` (Gallery grid with filters, search, rating slider, and detailed item modal)
  - `components/LastMediaWidget.tsx` (Interactive highlight card showing the most recently watched/completed item)

## Entry Schema & Conventions

Each item in `lib/media_database.json` is a JSON object with the following fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` (Required) | The official title of the work. |
| `type` | `string` (Required) | `"movie"`, `"anime"`, `"game"`, `"manga"`, `"light novel"`, or `"book"`. |
| `rating` | `string` (Optional) | Rating string from `"0.5"` to `"5.0"` (e.g. `"4.0"`, `"5.0"`). Omit if unrated. |
| `started` | `string` (Optional) | Date started in `DD-MM-YYYY` format (e.g. `"12-09-2026"`). |
| `completed` | `string` (Optional) | Date completed/watched in `DD-MM-YYYY` format (e.g. `"12-09-2026"`). |
| `cover_link` | `string` (Recommended) | Direct URL to poster image. |
| `body` | `string` (Optional) | Notes, review commentary, or viewing context (e.g., `"Rewatched on IMAX"`). Displayed in the item modal under Notes and on `LastMediaWidget`. |
| `director` | `string` (Optional) | Director name (e.g. `"William Wyler"`, `"Wes Anderson"`). |
| `released` | `string` (Optional) | Release year (e.g. `"1953"`, `"2026"`). |
| `format` | `string` (Optional) | Viewing format if applicable (e.g. `"IMAX"`). |
| `genre` | `string` (Optional) | Genre tag(s). |
| `eps` / `total episodes` | `string` (Optional) | Episode counts for anime/series. |

## Cover Image Sources

- **Movies**: Letterboxd 230x345 cropped poster (`https://a.ltrbxd.com/resized/film-poster/...-0-230-0-345-crop.jpg...`) or Wikimedia Commons / Wikipedia.
- **Anime & Manga**: AniList CDN (`https://s4.anilist.co/file/anilistcdn/media/anime/cover/...`).
- **Games**: IGDB CDN (`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/...`).

## Ordering & Insertion

- Entries in `lib/media_database.json` must remain sorted **alphabetically by `title`** (A to Z, case-insensitive). Non-ASCII characters (e.g., Japanese characters) sort at the end.
- When adding a new item, locate its alphabetical position and insert it there.

## Quality & Validation Checklist

1. Verify cover image URL returns HTTP 200 and image headers.
2. Verify dates are formatted as `DD-MM-YYYY` (e.g., September 12, 2026 $\rightarrow$ `12-09-2026`).
3. Verify JSON syntax remains valid:
   ```bash
   node -e "require('./lib/media_database.json')"
   ```
4. Check that `npm run build` passes cleanly.
