"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Film,
  Tv,
  Gamepad2,
  BookOpen,
  Book,
  Star,
  X,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  mediaDatabase,
  type MediaItem,
  getMediaStats,
  parseMediaDate,
} from "@/lib/mediaService";
import LastMediaWidget from "@/components/LastMediaWidget";

const ITEMS_PER_PAGE = 24;

const typeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  movie: Film,
  anime: Tv,
  game: Gamepad2,
  manga: BookOpen,
  "light novel": Book,
};

const typeLabelMap: Record<string, string> = {
  movie: "Movie",
  anime: "Anime",
  game: "Game",
  manga: "Manga",
  "light novel": "Light Novel",
};

// Render star ratings cleanly
function renderStarRating(ratingStr: string) {
  const num = parseFloat(ratingStr);
  if (isNaN(num) || num <= 0) {
    return <span className="text-zinc-400 text-xs font-sans">Unrated</span>;
  }

  const fullStars = Math.floor(num);
  const hasHalf = num % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-current" />
      ))}
      {hasHalf && (
        <span className="text-[11px] font-sans leading-none text-amber-500 font-bold ml-0.5">
          ½
        </span>
      )}
      <span className="ml-1 text-[11px] font-sans font-medium text-zinc-600 dark:text-zinc-400">
        {num.toFixed(1)}
      </span>
    </div>
  );
}

export default function MediaLogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  
  // Rating slider & null symbol unrated filter
  const [ratingMode, setRatingMode] = useState<"all" | "unrated" | "slider">("all");
  const [sliderValue, setSliderValue] = useState<number>(0);
  
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // Toggle state for search input and filter dropdown
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const stats = useMemo(() => getMediaStats(), []);

  // Filter Logic (Type + Rating Slider / Null Symbol + Search)
  const filteredItems = useMemo(() => {
    return mediaDatabase.filter((item) => {
      // 1. Type Filter
      if (selectedType !== "all" && item.type !== selectedType) {
        return false;
      }

      // 2. Rating Filter (Slider or Null Symbol for Unrated)
      if (ratingMode === "unrated") {
        const itemRating = parseFloat(item.rating);
        if (!isNaN(itemRating) && itemRating > 0) return false;
      } else if (ratingMode === "slider" && sliderValue > 0) {
        const itemRating = parseFloat(item.rating);
        if (isNaN(itemRating) || itemRating < sliderValue) return false;
      }

      // 3. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesGenre = item.genre?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesGenre) return false;
      }

      return true;
    });
  }, [selectedType, ratingMode, sliderValue, searchQuery]);

  // Sort Logic (Date Added/Completed, Rating, Title)
  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    list.sort((a, b) => {
      const rA = parseFloat(a.rating) || 0;
      const rB = parseFloat(b.rating) || 0;

      const dateA = parseMediaDate(a.completed || a.started);
      const dateB = parseMediaDate(b.completed || b.started);

      if (sortBy === "date-desc") return dateB - dateA;
      if (sortBy === "date-asc") return dateA - dateB;
      if (sortBy === "rating-desc") return rB - rA;
      if (sortBy === "rating-asc") return rA - rB;
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);

      return 0;
    });
    return list;
  }, [filteredItems, sortBy]);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, ratingMode, sliderValue, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE) || 1;
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedItems.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedItems, currentPage]);

  // Modal Escape key handler
  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  const activeFilterCount =
    (selectedType !== "all" ? 1 : 0) +
    (ratingMode !== "all" || sliderValue > 0 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="space-y-8">
      {/* Header & Back Link Container */}
      <div className="space-y-1">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-foreground transition-colors font-sans"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Header Title & Toggleable Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-3xl font-mono font-semibold text-red-600 dark:text-red-500">
              Welcome to artboxd.
            </h1>
          </div>

          {/* Action Toggle Controls */}
          <div className="flex items-center gap-3 text-xs font-sans">
            {/* Toggle Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-sans transition-all ${
                isSearchOpen || searchQuery
                  ? "bg-red-600 text-white border-red-600 font-medium shadow-sm"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-foreground"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
              {searchQuery && (
                <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5" />
              )}
            </button>

            {/* Toggle Filter Menu Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-sans transition-all ${
                isFilterOpen || activeFilterCount > 0
                  ? "bg-red-600 text-white border-red-600 font-medium shadow-sm"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter & Sort</span>
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white text-red-600 font-bold ml-0.5">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Latest Activity Widget */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <LastMediaWidget onSelect={(item) => setSelectedItem(item)} />
      </motion.div>

      {/* Expandable Search Input Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Type to search titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-9 py-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm font-sans placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expandable Filter & Sorting Dropdown Menu */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-5 bg-zinc-50/70 dark:bg-zinc-900/60 p-4 sm:p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-md">
              {/* Row 1: Media Type Filter Tabs */}
              <div className="space-y-2">
                <span className="text-[11px] font-sans font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Media Type
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-sans">
                  {[
                    { id: "all", label: `All (${stats.total})` },
                    { id: "movie", label: `Movies (${stats.counts.movie || 0})` },
                    { id: "anime", label: `Anime (${stats.counts.anime || 0})` },
                    { id: "game", label: `Games (${stats.counts.game || 0})` },
                    { id: "manga", label: `Manga (${stats.counts.manga || 0})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedType(tab.id)}
                      className={`px-3 py-1.5 rounded-md transition-colors font-sans ${
                        selectedType === tab.id
                          ? "bg-red-600 text-white font-medium shadow-sm"
                          : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60 hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2: Rating Slider & Null Symbol (∅) Unrated Filter */}
              <div className="space-y-2 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <span className="text-[11px] font-sans font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Rating Filter
                </span>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-sans">
                  {/* Range Slider */}
                  <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 w-full sm:w-auto">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={ratingMode === "unrated" ? 0 : sliderValue}
                      onChange={(e) => {
                        setRatingMode("slider");
                        setSliderValue(parseFloat(e.target.value));
                      }}
                      disabled={ratingMode === "unrated"}
                      className="w-36 sm:w-44 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                    <span className="text-xs font-sans font-medium text-amber-600 dark:text-amber-400 min-w-[75px]">
                      {ratingMode === "unrated"
                        ? "∅ Unrated"
                        : sliderValue === 0
                        ? "Any Rating"
                        : `★ ${sliderValue.toFixed(1)}+`}
                    </span>
                  </div>

                  {/* Null Symbol (∅) Button for Unrated Items */}
                  <button
                    onClick={() => {
                      if (ratingMode === "unrated") {
                        setRatingMode("all");
                      } else {
                        setRatingMode("unrated");
                      }
                    }}
                    title="Filter Unrated Items"
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md border text-xs font-sans transition-colors ${
                      ratingMode === "unrated"
                        ? "bg-amber-600 text-white border-amber-600 font-medium shadow-sm"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-foreground"
                    }`}
                  >
                    <span className="text-sm font-semibold font-mono leading-none">∅</span>
                    <span>Unrated</span>
                  </button>

                  {/* Reset Rating Filter */}
                  {(ratingMode !== "all" || sliderValue > 0) && (
                    <button
                      onClick={() => {
                        setRatingMode("all");
                        setSliderValue(0);
                      }}
                      className="text-xs font-sans text-zinc-400 hover:text-foreground underline transition-colors"
                    >
                      Reset rating
                    </button>
                  )}
                </div>
              </div>

              {/* Row 3: Sort Options Selector */}
              <div className="space-y-2 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <span className="text-[11px] font-sans font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Sort Order
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto text-xs font-sans bg-white dark:bg-zinc-900 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800">
                  <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-foreground focus:outline-none cursor-pointer font-sans w-full"
                  >
                    <option value="date-desc">Date Added (Newest First)</option>
                    <option value="date-asc">Date Added (Oldest First)</option>
                    <option value="rating-desc">Rating: High to Low</option>
                    <option value="rating-asc">Rating: Low to High</option>
                    <option value="title-asc">Title: A to Z</option>
                    <option value="title-desc">Title: Z to A</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Grid: Letterboxd 4:5 Aspect Ratio Posters (4 per row standard on PC) */}
      {paginatedItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {paginatedItems.map((item, index) => {
            const Icon = typeIconMap[item.type] || Film;
            const displayDate = item.completed || item.started;

            return (
              <motion.div
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index % 24) * 0.03 }}
                className="group relative flex flex-col space-y-2 cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => setSelectedItem(item)}
              >
                {/* 27:40 Ratio Media Poster Container */}
                <div className="relative aspect-[27/40] w-full bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 border border-zinc-200/60 dark:border-zinc-800/60">
                  {item.cover_link ? (
                    <img
                      src={item.cover_link}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-zinc-200 dark:bg-zinc-800 text-zinc-500">
                      <Icon className="w-8 h-8 mb-2 opacity-50" />
                      <span className="text-[10px] font-sans line-clamp-2">
                        {item.title}
                      </span>
                    </div>
                  )}

                  {/* Icon Overlay Badge */}
                  <div className="absolute top-2 left-2 flex items-center justify-center p-1.5 rounded-md bg-black/65 backdrop-blur-md text-white shadow">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Rating, Title & Optional Date below poster */}
                <div className="space-y-1">
                  <div>{renderStarRating(item.rating)}</div>
                  <h3 className="font-mono font-semibold text-xs text-foreground group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                  {displayDate && (
                    <p className="text-[10px] font-sans text-zinc-500 dark:text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {displayDate}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg space-y-2">
          <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400">
            No media entries found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedType("all");
              setRatingMode("all");
              setSliderValue(0);
            }}
            className="text-xs font-sans text-red-600 dark:text-red-400 underline hover:opacity-80 font-medium"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-6 font-sans text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Detail Pop-up Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setSelectedItem(null)}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-2xl space-y-6 relative overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-500 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  {/* Poster image in modal */}
                  <div className="w-36 aspect-[27/40] bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden flex-shrink-0 border border-zinc-200 dark:border-zinc-800 shadow-md">
                    {selectedItem.cover_link ? (
                      <img
                        src={selectedItem.cover_link}
                        alt={selectedItem.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Film className="w-8 h-8 text-zinc-400 opacity-50" />
                      </div>
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-3 flex-1">
                    <div>
                      <span className="text-[11px] font-sans font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {typeLabelMap[selectedItem.type] || selectedItem.type}
                      </span>
                      <h2 className="text-xl font-mono font-semibold text-foreground mt-2 leading-snug">
                        {selectedItem.title}
                      </h2>
                    </div>

                    <div>{renderStarRating(selectedItem.rating)}</div>

                    <div className="text-xs font-sans text-zinc-600 dark:text-zinc-400 space-y-1 pt-1">
                      {selectedItem.completed && (
                        <p className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Completed: {selectedItem.completed}</span>
                        </p>
                      )}
                      {selectedItem.started && (
                        <p className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Started: {selectedItem.started}</span>
                        </p>
                      )}
                      {!selectedItem.completed && !selectedItem.started && (
                        <p className="text-zinc-400 text-[11px]">
                          No completion date specified
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Properties */}
                {selectedItem.properties &&
                  Object.keys(selectedItem.properties).length > 0 && (
                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
                      <h4 className="text-xs font-sans font-semibold text-zinc-700 dark:text-zinc-300">
                        Details & Properties
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                        {Object.entries(selectedItem.properties).map(
                          ([k, v]) =>
                            v &&
                            k !== "cover link" &&
                            k !== "title" && (
                              <div
                                key={k}
                                className="p-2 rounded bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800"
                              >
                                <span className="text-zinc-500 dark:text-zinc-400 capitalize block text-[10px]">
                                  {k}
                                </span>
                                <span className="text-foreground font-normal truncate block">
                                  {v}
                                </span>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  )}

                {/* Notes / Body */}
                {selectedItem.body && selectedItem.body.trim() !== "" && (
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-1">
                    <h4 className="text-xs font-sans font-semibold text-zinc-700 dark:text-zinc-300">
                      Notes
                    </h4>
                    <p className="text-xs font-sans font-normal text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                      {selectedItem.body}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
