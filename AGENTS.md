# Workspace Agent Instructions & Guidelines

Welcome to Artem's personal website and digital portfolio workspace (`artemiui.github.io`).

## Dedicated Subagents & Skills

### Paper → Interactive Rendition (`paper-to-interactive`)
When asked to turn a research paper, notebook, or project into an interactive page with data
visualization, use the **Paper → Interactive Rendition** skill:

- **Workspace Skill**: `.agents/skills/paper-to-interactive/SKILL.md`
- **Interactive pages**: `public/<slug>/index.html` (standalone, self-contained, D3 from CDN)
- **Full-article host**: `components/InteractivePost.tsx` — mounts a rendition *as* the article
  body via `layout: "interactive"` frontmatter (see `lib/mdx.ts`)
- **Embed component**: `components/InteractiveDiagram.tsx` — a boxed figure inside normal prose
- **Article**: `content/posts/articleN.mdx` with `category: "Papers"`

Core rules: recompute every number from the raw dataset (never transcribe values off a rendered
figure), verify the extraction against the paper's reported statistics, load the `dataviz` skill
before writing any chart code and the `unslop` / `impeccable` / `emil-design-eng` skills before
writing the page's chrome, write the prose in Artem's own voice from the source document,
screenshot the result in both themes before calling it done, and keep raw research data in a
gitignored directory (`.ds102/`).

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
