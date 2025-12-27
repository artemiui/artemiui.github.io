"use client";

import { motion } from "framer-motion";
import { categoryIcons } from "@/lib/categoryIcons";

export type Category = "All" | "Knowledge" | "Media" | "Hobby" | "Design";

type FeedFilterProps = {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
};

const filterCategoryIcons = {
  All: null,
  ...categoryIcons,
};

const categories: Category[] = ["All", "Knowledge", "Media", "Hobby", "Design"];

export default function FeedFilter({
  activeCategory,
  onCategoryChange,
}: FeedFilterProps) {
  return (
    <div className="flex gap-6 mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
      {categories.map((category) => {
        const Icon = filterCategoryIcons[category];
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className="flex items-center gap-2 text-sm relative pb-1"
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span
              className={
                activeCategory === category
                  ? "text-foreground font-medium"
                  : "text-zinc-500 dark:text-zinc-500 hover:text-foreground transition-colors"
              }
            >
              {category}
            </span>
            {activeCategory === category && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

