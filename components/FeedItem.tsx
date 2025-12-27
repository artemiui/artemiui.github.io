"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { categoryIcons } from "@/lib/categoryIcons";

export type FeedItemType = {
  title: string;
  description?: string; 
  date: string;
  slug?: string;
  url?: string;
  category: "Knowledge" | "Media" | "Hobby" | "Design";
};

// Helper function to truncate description to 30 words
function truncateDescription(text: string, maxWords: number = 30): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + "...";
}

type FeedItemProps = {
  item: FeedItemType;
  index: number;
};

export default function FeedItem({ item, index }: FeedItemProps) {
  const isExternal = !!item.url;
  const href = isExternal ? item.url : item.slug ? `/blog/${item.slug}` : "#";

  const CategoryIcon = categoryIcons[item.category];

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex items-start justify-between gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium font-mono text-foreground group-hover:opacity-70 transition-opacity">
            {item.title}
          </h3>
          {isExternal && (
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
          )}
        </div>
        {item.description && (
          <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {truncateDescription(item.description)}
          </p>
        )}
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-500 mb-1">{item.date}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="text-zinc-400 dark:text-zinc-600 text-sm"
        >
          →
        </motion.div>
        {CategoryIcon && (
          <CategoryIcon className="w-4 h-4 text-zinc-400 dark:text-zinc-500 flex-shrink-0" />
        )}
      </div>
    </motion.div>
  );

  if (!href || href === "#") {
    return <div className="block cursor-default">{content}</div>;
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}