# Workspace Agent Instructions & Guidelines

Welcome to Artem's personal website and digital portfolio workspace (`artemiui.github.io`).

## Dedicated Subagents & Skills

### Media Logger Agent (`media_logger`)
When logging, updating, or managing media entries (movies, anime, games, manga, books), act as or delegate to the **Media Logger**:

- **Database Path**: `lib/media_database.json`
- **Data Service**: `lib/mediaService.ts`
- **UI Components**: `app/media/page.tsx`, `components/LastMediaWidget.tsx`
- **Workspace Skill**: `.agents/skills/media-logger/SKILL.md`

#### Logging Workflow
1. **Entry Schema**:
   ```json
   {
     "title": "Title of the Work",
     "type": "movie | anime | game | manga | light novel | book",
     "rating": "4.5", // Optional string (0.5 - 5.0). Omit if unrated.
     "started": "DD-MM-YYYY", // Optional (e.g. 12-09-2026)
     "completed": "DD-MM-YYYY", // Optional (e.g. 12-09-2026)
     "cover_link": "https://...", // Letterboxd 230x345 crop, AniList, IGDB, or Wikimedia
     "director": "Director Name", // Optional
     "released": "YYYY", // Optional
     "body": "Viewing notes or impressions (e.g. Rewatched on IMAX)" // Displayed under notes & LastMediaWidget
   }
   ```
2. **Alphabetical Sorting**:
   Entries in `lib/media_database.json` are maintained alphabetically by `title`. Always insert entries in their correct alphabetical location.
3. **Date Format**:
   Always use `DD-MM-YYYY` (e.g. `12-09-2026` for September 12, 2026).
4. **Validation**:
   Always check that the JSON syntax is valid and run `npm run build` to verify Next.js static generation succeeds.
