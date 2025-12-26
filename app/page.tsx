"use client";

import { useState, useMemo } from "react";
import FeedFilter, { type Category } from "@/components/FeedFilter";
import FeedItem, { type FeedItemType } from "@/components/FeedItem";

// Sample data - in production, projects could come from a CMS
const projects = [
  {
    title: "Aftershock Frequency and Magnitude Estimation of Philippine Earthquakes Using Omori’s Law and Bath’s Law",
    description: "Modeled earthquake magnitude and frequency within temporal constraints of significant events in the UPRI Citizen Science Earthquake Database using Omori's Law and Bath's Law. Built on SciPy, NumPy, ObsPy, and Seaborn.",
  },
  {
    title: "Public Knowledge and Attitudes on Microplastic Contamination of Aquaculture and Fisheries Products in CAMANAVA",
    description: "Primary author, adapted and semi-developed a survey reliability tested using Cronbach's Alpha. Surveyed 278 respondents within 3 months to assess knowledge, attitudes, and practices on MP contamination of AQF products in Caloocan, Malabon, Navotas, and Valenzuela. Publicly available for read at the International Research Journal for Urban and Rural Development.",
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

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? feedItems
      : feedItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

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

      {/* Feed Section */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Feed</h2>
        <FeedFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <div className="space-y-0">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
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
      </section>
    </div>
  );
}
