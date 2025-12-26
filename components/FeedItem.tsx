"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export type FeedItemType = {
  title: string;
  date: string;
  slug?: string;
  url?: string;
  category: "Knowledge" | "Essays" | "Hobby" | "Design";
};

type FeedItemProps = {
  item: FeedItemType;
  index: number;
};

export default function FeedItem({ item, index }: FeedItemProps) {
  const isExternal = !!item.url;
  const href = isExternal ? item.url : `/blog/${item.slug}`;

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex items-start justify-between gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-foreground group-hover:opacity-70 transition-opacity">
            {item.title}
          </h3>
          {isExternal && (
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">{item.date}</p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="text-zinc-400 dark:text-zinc-600 text-sm"
      >
        →
      </motion.div>
    </motion.div>
  );

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

