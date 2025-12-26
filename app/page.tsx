"use client";

import { useState, useMemo, useEffect } from "react";
import FeedFilter, { type Category } from "@/components/FeedFilter";
import FeedItem, { type FeedItemType } from "@/components/FeedItem";
import FeedPagination from "@/components/FeedPagination";

// In production, you could fetch posts from the file system and merge with external links
const feedItems: FeedItemType[] = [
  {
    title: "Understanding Type Systems",
    date: "2024-01-15",
    slug: "understanding-type-systems",
    category: "Knowledge",
  },
  {
    title: "A Computational Model of Piano Finger Technique",
    date: "2023-12-15",
    url: "https://nlp.lab.uic.edu/wp-content/uploads/sites/314/2023/06/Randolph_CRF2.pdf",
    category: "Knowledge",
  },
];

const ITEMS_PER_PAGE = 5;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? feedItems
      : feedItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage]);

  return (
    <div className="space-y-12 text-xl font-semibold mb-6">
      {/* Bio Section */}
      <section>
        <p className="text-zinc-700 dark:text-zinc-300 leading-7">
        "The divide between the arts and the sciences is a mistake."
        </p>
      </section>

      {/* Feed Section */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Feed</h2>
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
    </div>
  );
}
