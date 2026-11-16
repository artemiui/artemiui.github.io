"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Search, SlidersHorizontal, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { formatMediaDate, getMediaStats, mediaDatabase, parseMediaDate, type MediaItem } from "@/lib/mediaService";
import LastMediaWidget from "@/components/LastMediaWidget";
import { Poster, Stars, ratingValue, typeLabel, verbFor } from "@/components/MediaPoster";

const ITEMS_PER_PAGE = 24;
const ease = [0.16, 1, 0.3, 1] as const;

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const sorts = {
  "date-desc": "Newest",
  "date-asc": "Oldest",
  "rating-desc": "Highest rated",
  "rating-asc": "Lowest rated",
  "title-asc": "A to Z",
  "title-desc": "Z to A",
} as const;
type SortKey = keyof typeof sorts;

/** Fields shown in the detail sheet, in order. Everything else stays out. */
const detailFields: [string, string][] = [
  ["director", "Director"],
  ["released", "Released"],
  ["format", "Format"],
  ["genre", "Genre"],
  ["eps watched", "Episodes watched"],
  ["eps", "Episodes"],
  ["total episodes", "Total episodes"],
  ["last read/watched", "Last read"],
];

function Card({ item, onOpen }: { item: MediaItem; onOpen: () => void }) {
  const date = item.completed || item.started;
  const rating = ratingValue(item.rating);
  return (
    <button type="button" onClick={onOpen} className={`group block w-full rounded-md text-left cursor-pointer ${focusRing}`}>
      <Poster
        src={item.cover_link}
        title={item.title}
        type={item.type}
        className="transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.45)]"
      />
      <h3 className="mt-2.5 line-clamp-2 font-mono text-xs font-semibold leading-4 text-foreground transition-colors duration-150 group-hover:text-red-600 dark:group-hover:text-red-400">
        {item.title}
      </h3>
      <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] leading-4 text-zinc-500 tabular-nums">
        {rating > 0 && (
          <span className="inline-flex items-center gap-0.5 text-zinc-700 dark:text-zinc-300">
            <Star className="size-3 fill-current" strokeWidth={0} aria-hidden="true" />
            {rating.toFixed(1)}
          </span>
        )}
        {date && <span className="whitespace-nowrap">{formatMediaDate(date)}</span>}
      </p>
    </button>
  );
}

function Detail({ item, onClose }: { item: MediaItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const props = item.properties ?? {};
  const details = detailFields.filter(([key]) => props[key]);
  const finished = formatMediaDate(item.completed);
  const started = formatMediaDate(item.started);
  const verb = verbFor[item.type] ?? "Finished";
  const body = item.body?.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={item.title}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-zinc-950/60"
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease }}
        className="relative max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-t-2xl bg-background p-6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.5)] ring-1 ring-zinc-950/10 sm:rounded-2xl sm:p-8 dark:ring-white/10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute right-4 top-4 grid size-8 place-items-center rounded-full text-zinc-500 transition-colors duration-150 hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800 ${focusRing}`}
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>

        <div className="flex gap-5 sm:gap-6">
          <Poster src={item.cover_link} title={item.title} type={item.type} className="w-24 shrink-0 sm:w-32" />
          <div className="min-w-0 space-y-3 pr-6">
            <p className="text-sm text-zinc-500">{typeLabel[item.type] ?? item.type}</p>
            <h2 className="font-mono text-xl font-semibold leading-tight text-balance text-foreground">{item.title}</h2>
            <Stars rating={item.rating} className="size-4" />
            <div className="space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              {finished && (
                <p>
                  {verb} {finished}
                </p>
              )}
              {started && started !== finished && <p className="text-zinc-500">Started {started}</p>}
            </div>
          </div>
        </div>

        {details.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-zinc-950/10 pt-5 text-sm dark:border-white/10">
            {details.map(([key, label]) => (
              <div key={key} className="min-w-0">
                <dt className="text-xs text-zinc-500">{label}</dt>
                <dd className="truncate text-foreground">{props[key]}</dd>
              </div>
            ))}
          </dl>
        )}

        {body && (
          <p className="mt-6 whitespace-pre-line border-t border-zinc-950/10 pt-5 text-sm leading-6 text-zinc-700 dark:border-white/10 dark:text-zinc-300">
            {body}
          </p>
        )}
      </motion.div>
    </div>
  );
}

const toggleClass = (on: boolean) =>
  `relative inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-sm transition-[background-color,color,box-shadow] duration-150 cursor-pointer ${focusRing} ${
    on
      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
      : "text-zinc-600 ring-1 ring-inset ring-zinc-950/10 hover:bg-zinc-100 hover:text-foreground dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-zinc-900"
  }`;

const chipClass = (on: boolean) =>
  `inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm transition-colors duration-150 cursor-pointer ${focusRing} ${
    on
      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
      : "bg-white text-zinc-600 ring-1 ring-inset ring-zinc-950/10 hover:text-foreground dark:bg-zinc-900 dark:text-zinc-400 dark:ring-white/10"
  }`;

const panel = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.25, ease },
} as const;

export default function MediaLogPage() {
  const [query, setQueryRaw] = useState("");
  const [type, setTypeRaw] = useState("all");
  const [minRating, setMinRatingRaw] = useState(0);
  const [unrated, setUnratedRaw] = useState(false);
  const [sort, setSortRaw] = useState<SortKey>("date-desc");
  const [page, setPage] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  // Any filter or sort change returns to the first page.
  const resetting =
    <T,>(set: (value: T) => void) =>
    (value: T) => {
      set(value);
      setPage(1);
    };
  const setQuery = resetting(setQueryRaw);
  const setType = resetting(setTypeRaw);
  const setMinRating = resetting(setMinRatingRaw);
  const setUnrated = resetting(setUnratedRaw);
  const setSort = resetting(setSortRaw);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const top = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => getMediaStats(), []);
  const tabs = [
    { id: "all", label: "All", count: stats.total },
    { id: "movie", label: "Movies", count: stats.counts.movie ?? 0 },
    { id: "anime", label: "Anime", count: stats.counts.anime ?? 0 },
    { id: "game", label: "Games", count: stats.counts.game ?? 0 },
    { id: "manga", label: "Manga", count: stats.counts.manga ?? 0 },
  ];

  const items = useMemo(() => {
    const q = query.toLowerCase().trim();
    const list = mediaDatabase.filter((item) => {
      if (type !== "all" && item.type !== type) return false;
      const r = ratingValue(item.rating);
      if (unrated ? r > 0 : r < minRating) return false;
      if (q && !item.title.toLowerCase().includes(q) && !item.genre?.toLowerCase().includes(q)) return false;
      return true;
    });
    const date = (i: MediaItem) => parseMediaDate(i.completed || i.started);
    const compare: Record<SortKey, (a: MediaItem, b: MediaItem) => number> = {
      "date-desc": (a, b) => date(b) - date(a),
      "date-asc": (a, b) => date(a) - date(b),
      "rating-desc": (a, b) => ratingValue(b.rating) - ratingValue(a.rating),
      "rating-asc": (a, b) => ratingValue(a.rating) - ratingValue(b.rating),
      "title-asc": (a, b) => a.title.localeCompare(b.title),
      "title-desc": (a, b) => b.title.localeCompare(a.title),
    };
    return list.sort(compare[sort]);
  }, [query, type, minRating, unrated, sort]);

  const pages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  const visible = items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const activeFilters = (type !== "all" ? 1 : 0) + (unrated || minRating > 0 ? 1 : 0) + (sort !== "date-desc" ? 1 : 0);
  const filtered = Boolean(query) || activeFilters > 0;

  const goTo = (next: number) => {
    setPage(next);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => {
    setType("all");
    setMinRating(0);
    setUnrated(false);
    setSort("date-desc");
  };
  const reset = () => {
    setQuery("");
    resetFilters();
  };

  return (
    <div className="space-y-12">
      <h1 className="sr-only">Media log</h1>
      <LastMediaWidget onSelect={setSelected} />

      <div ref={top} className="scroll-mt-6 space-y-8">
        <div className="border-t border-zinc-950/10 pt-6 dark:border-white/10">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-500 tabular-nums" aria-live="polite">
              {items.length === stats.total ? `${stats.total} titles` : `${items.length} of ${stats.total}`}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                aria-expanded={searchOpen}
                aria-controls="media-search"
                className={toggleClass(searchOpen || Boolean(query))}
              >
                <Search className="size-4" strokeWidth={1.5} />
                Search
              </button>
              <button
                type="button"
                onClick={() => setFilterOpen((v) => !v)}
                aria-expanded={filterOpen}
                aria-controls="media-filters"
                className={toggleClass(filterOpen || activeFilters > 0)}
              >
                <SlidersHorizontal className="size-4" strokeWidth={1.5} />
                Filter
                {activeFilters > 0 && (
                  <span className="grid size-5 place-items-center rounded-full bg-red-600 text-[11px] font-medium text-white tabular-nums">
                    {activeFilters}
                  </span>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {searchOpen && (
              <motion.div key="search" id="media-search" {...panel} className="-mx-1 overflow-hidden px-1 pb-1">
                <label className="relative mt-4 block">
                  <span className="sr-only">Search titles and genres</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" strokeWidth={1.5} />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        if (query) setQuery("");
                        else setSearchOpen(false);
                      }
                    }}
                    placeholder="Search titles and genres"
                    autoFocus
                    className="h-11 w-full rounded-xl bg-zinc-100 pl-11 pr-11 text-sm text-foreground placeholder:text-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-zinc-900 [&::-webkit-search-cancel-button]:hidden"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className={`absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-zinc-500 hover:bg-zinc-200 hover:text-foreground dark:hover:bg-zinc-800 cursor-pointer ${focusRing}`}
                    >
                      <X className="size-4" strokeWidth={1.5} />
                    </button>
                  )}
                </label>
              </motion.div>
            )}

            {filterOpen && (
              <motion.div key="filters" id="media-filters" {...panel} className="-mx-1 overflow-hidden px-1 pb-1">
                <div className="mt-4 space-y-5 rounded-2xl bg-zinc-50 p-4 ring-1 ring-inset ring-zinc-950/5 sm:p-5 dark:bg-zinc-900/60 dark:ring-white/5">
                  <fieldset className="space-y-2.5">
                    <legend className="text-sm text-zinc-500">Type</legend>
                    <div className="flex flex-wrap gap-1.5">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          aria-pressed={type === tab.id}
                          onClick={() => setType(tab.id)}
                          className={chipClass(type === tab.id)}
                        >
                          {tab.label}
                          <span className="text-xs tabular-nums opacity-50">{tab.count}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="space-y-2.5">
                    <legend className="text-sm text-zinc-500">Rating</legend>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                      <label className={`flex h-8 items-center gap-3 ${unrated ? "opacity-40" : ""}`}>
                        <span className="sr-only">Minimum rating</span>
                        <input
                          type="range"
                          min={0}
                          max={5}
                          step={0.5}
                          value={unrated ? 0 : minRating}
                          disabled={unrated}
                          onChange={(e) => setMinRating(parseFloat(e.target.value))}
                          className="h-1 w-40 cursor-pointer accent-zinc-900 disabled:cursor-not-allowed sm:w-48 dark:accent-zinc-100"
                        />
                        <span className="inline-flex min-w-16 items-center gap-1 text-sm text-foreground tabular-nums">
                          {minRating > 0 && !unrated ? (
                            <>
                              <Star className="size-3.5 fill-current" strokeWidth={0} aria-hidden="true" />
                              {minRating.toFixed(1)}+
                            </>
                          ) : (
                            "Any"
                          )}
                        </span>
                      </label>
                      <button type="button" aria-pressed={unrated} onClick={() => setUnrated(!unrated)} className={chipClass(unrated)}>
                        Unrated only
                      </button>
                    </div>
                  </fieldset>

                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <label className="space-y-2.5">
                      <span className="block text-sm text-zinc-500">Sort by</span>
                      <span className="relative flex">
                        <select
                          value={sort}
                          onChange={(e) => setSort(e.target.value as SortKey)}
                          className={`h-8 cursor-pointer appearance-none rounded-full bg-white pl-3 pr-8 text-sm text-foreground ring-1 ring-inset ring-zinc-950/10 dark:bg-zinc-900 dark:ring-white/10 ${focusRing}`}
                        >
                          {(Object.keys(sorts) as SortKey[]).map((key) => (
                            <option key={key} value={key}>
                              {sorts[key]}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-zinc-400" strokeWidth={1.5} />
                      </span>
                    </label>
                    {activeFilters > 0 && (
                      <button
                        type="button"
                        onClick={resetFilters}
                        className={`h-8 rounded text-sm text-zinc-500 underline decoration-zinc-400/60 underline-offset-4 transition-colors duration-150 hover:text-foreground cursor-pointer ${focusRing}`}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-3 gap-x-3 gap-y-7 sm:grid-cols-4 sm:gap-x-5 sm:gap-y-9">
            {visible.map((item) => (
              <Card key={`${item.type}-${item.title}`} item={item} onOpen={() => setSelected(item)} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 py-20 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Nothing matches that.</p>
            {filtered && (
              <button
                type="button"
                onClick={reset}
                className={`rounded text-sm text-foreground underline decoration-zinc-400 underline-offset-4 hover:decoration-foreground cursor-pointer ${focusRing}`}
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {pages > 1 && (
          <nav className="flex items-center justify-between border-t border-zinc-950/10 pt-6 text-sm dark:border-white/10" aria-label="Pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => goTo(page - 1)}
              className={`inline-flex h-9 items-center gap-1 rounded-md px-3 text-zinc-700 transition-colors duration-150 hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-30 dark:text-zinc-300 dark:hover:bg-zinc-900 cursor-pointer ${focusRing}`}
            >
              <ChevronLeft className="size-4" strokeWidth={1.5} />
              Previous
            </button>
            <span className="text-xs text-zinc-500 tabular-nums">
              {page} / {pages}
            </span>
            <button
              type="button"
              disabled={page === pages}
              onClick={() => goTo(page + 1)}
              className={`inline-flex h-9 items-center gap-1 rounded-md px-3 text-zinc-700 transition-colors duration-150 hover:bg-zinc-100 disabled:pointer-events-none disabled:opacity-30 dark:text-zinc-300 dark:hover:bg-zinc-900 cursor-pointer ${focusRing}`}
            >
              Next
              <ChevronRight className="size-4" strokeWidth={1.5} />
            </button>
          </nav>
        )}
      </div>

      <AnimatePresence>{selected && <Detail key={selected.title} item={selected} onClose={close} />}</AnimatePresence>
    </div>
  );
}
