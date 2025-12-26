"use client";

import { useState, useMemo, useEffect } from "react";
import FeedFilter, { type Category } from "@/components/FeedFilter";
import FeedItem, { type FeedItemType } from "@/components/FeedItem";
import FeedPagination from "@/components/FeedPagination";
import NowWatching, { type MediaItem } from "@/components/NowWatching";

// Sample data - in production, projects could come from a CMS
const projects = [
  {
    title: "Aftershock Frequency and Magnitude Estimation of Philippine Earthquakes Using Omori’s Law and Bath’s Law",
    description: "Modeled earthquake magnitude and frequency within temporal constraints of significant events in the UPRI Citizen Science Earthquake Database using Omori's Law and Bath's Law. Built on SciPy, NumPy, ObsPy, and Seaborn.",
  },
  {
    title: "Public Knowledge and Attitudes on Microplastic Contamination of Aquaculture and Fisheries Products in CAMANAVA",
    description: "Surveyed 278 respondents to statistically analyze knowledge, attitudes, and practices on MP contamination of AQF products in cities of Caloocan, Malabon, Navotas, and Valenzuela. Publicly available to read at the International Research Journal for Urban and Rural Development.",
  },
];

// Sample media items - in production, this could come from a CMS or API
const nowWatchingItems: MediaItem[] = [
  {
    title: "Jujutsu Kaisen 2",
    type: "show",
    posterUrl: "https://m.media-amazon.com/images/I/71mqttVzH-L._AC_UF1000,1000_QL80_.jpg",
    link: "https://anilist.co/anime/145064/Jujutsu-Kaisen-2nd-Season/",
  },
  {
    title: "Chainsaw Man 2",
    type: "manga",
    posterUrl: "https://external-preview.redd.it/6hHoeEiPVBKKewFkSDegJbTHCLUKqWOlYjCBkeekcAQ.jpg?auto=webp&s=617b28f4be9b1da17967e8904f1e0ed0694fdb09",
    link: "https://anilist.co/anime/127230/Chainsaw-Man",
  },
  {
    title: "Suits",
    type: "anime",
    posterUrl: "https://image.tmdb.org/t/p/original/wVji3gmzWUC6x3SQwFU52Gzvmgr.jpg",
    link: "https://en.wikipedia.org/wiki/Suits_(American_TV_series)m",
  },
];

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
    <div className="space-y-16 text-xl font-semibold mb-6">
      {/* Bio Section */}
      <section>
        <p className="text-zinc-700 dark:text-zinc-300 leading-7">
        "The divide between the arts and the sciences is a mistake."
        </p>
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Projects</h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="space-y-1">
              <h3 className="font-medium text-foreground">{project.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Now Watching / Reading Section */}
      <NowWatching items={nowWatchingItems} />

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
