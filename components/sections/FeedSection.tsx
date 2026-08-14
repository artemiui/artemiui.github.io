"use client";

import { useState, useMemo, useEffect } from "react";
import FeedFilter, { type Category } from "@/components/FeedFilter";
import FeedItem, { type FeedItemType } from "@/components/FeedItem";
import FeedPagination from "@/components/FeedPagination";

const ITEMS_PER_PAGE = 5;

interface FeedSectionProps {
  itemsPerPage?: number;
  className?: string;
}

export default function FeedSection({
  itemsPerPage = ITEMS_PER_PAGE,
  className = "",
}: FeedSectionProps) {
  const [feedItems, setFeedItems] = useState<FeedItemType[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadFeedItems() {
      try {
        const response = await fetch("/api/feed-items");
        if (response.ok) {
          const items = await response.json();
          setFeedItems(items);
        }
      } catch (error) {
        console.error("Failed to load feed items:", error);
      }
    }
    loadFeedItems();
  }, []);

  // Compute available tags for Research category
  const availableTags = useMemo(() => {
    if (activeCategory !== "Research") return [];
    const categoryItems = feedItems.filter((item) => item.category === "Research");

    const tagsSet = new Set<string>();
    categoryItems.forEach((item) => {
      item.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [activeCategory, feedItems]);

  const filteredItems = useMemo(() => {
    let items =
      activeCategory === "All"
        ? feedItems
        : feedItems.filter((item) => item.category === activeCategory);

    if (activeCategory === "Research" && selectedTag) {
      items = items.filter((item) => item.tags?.includes(selectedTag));
    }
    return items;
  }, [activeCategory, selectedTag, feedItems]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedTag(null);
  }, [activeCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage, itemsPerPage]);

  return (
    <section className={`feed-section overflow-x-hidden ${className}`}>
      <FeedFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {activeCategory === "Research" && availableTags.length > 0 && (
        <div className="flex items-center gap-2 mb-6 pb-2 -mt-4 overflow-x-auto sm:overflow-x-visible scrollbar-hide">
          <span className="text-xs font-sans text-zinc-500 dark:text-zinc-400 flex-shrink-0">
            Topic:
          </span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-2.5 py-0.5 rounded-full text-xs font-sans transition-all flex-shrink-0 ${
              !selectedTag
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-foreground"
            }`}
          >
            All Topics
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-2.5 py-0.5 rounded-full text-xs font-sans transition-all flex-shrink-0 ${
                selectedTag === tag
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium shadow-sm"
                  : "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <div className="space-y-0">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item, index) => (
            <FeedItem
              key={item.slug || item.url || index}
              item={item}
              index={index}
            />
          ))
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-500 py-8">
            No items in this category.
          </p>
        )}
      </div>
      <FeedPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
