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

  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? feedItems
      : feedItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, feedItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

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
