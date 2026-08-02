"use client";

import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { categoryIcons } from "@/lib/categoryIcons";

export type FeedItemType = {
  title: string;
  description?: string;
  date: string;
  slug?: string;
  url?: string;
  category: "Knowledge" | "Media" | "Hobby" | "Papers";
};

// Helper function to truncate description to 30 words for the home feed
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
  const isExternal = Boolean(item.url);
  const internalHref = item.slug ? `/blog/${item.slug}` : "#";
  const [isOpen, setIsOpen] = useState(false);

  const CategoryIcon = categoryIcons[item.category];

  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium font-mono text-foreground group-hover:opacity-70 transition-opacity truncate">
            {item.title}
          </h3>
          {isExternal && (
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
          )}
        </div>
        {item.description && (
          <p className="text-xs font-sans font-normal text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {truncateDescription(item.description)}
          </p>
        )}
        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-500 mb-1">
          {item.date}
        </p>
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

  return (
    <>
      {isExternal ? (
        <div onClick={() => setIsOpen(true)} className="block">
          {content}
        </div>
      ) : (
        <Link href={internalHref} className="block">
          {content}
        </Link>
      )}

      {/* Overlay Pop Up Modal for External Linked Feed Items */}
      <AnimatePresence>
        {isOpen && isExternal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Right Close X Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-500 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Title & Category Badge */}
                <div className="space-y-2 pr-8">
                  <div className="flex items-center gap-2">
                    {CategoryIcon && (
                      <CategoryIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      {item.date}
                    </span>
                  </div>

                  <h2 className="text-xl font-mono font-semibold text-foreground leading-snug">
                    {item.title}
                  </h2>
                </div>

                {/* Complete Untruncated Description (Unbolded) */}
                {item.description && (
                  <div className="py-4 border-y border-zinc-100 dark:border-zinc-800/80">
                    <p className="text-sm font-sans font-normal text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                )}

                {/* External Link Icon Button */}
                <div className="pt-2 flex justify-start">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2.5 rounded-md bg-red-600 hover:bg-red-700 text-white shadow transition-all duration-200 group"
                    aria-label="Redirect to external link"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}