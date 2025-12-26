"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export type MediaItem = {
  title: string;
  type: "show" | "manga" | "anime";
  posterUrl: string;
  link?: string;
};

type NowWatchingProps = {
  items: MediaItem[];
};

export default function NowWatching({ items }: NowWatchingProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-6">What I'm Watching and Reading</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex-shrink-0"
          >
            {item.link ? (
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative w-24 h-36 rounded-sm overflow-hidden bg-zinc-100 dark:bg-zinc-900 hover:opacity-80 transition-opacity">
                  <Image
                    src={item.posterUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 text-center max-w-[96px] line-clamp-2 group-hover:text-foreground transition-colors">
                  {item.title}
                </p>
              </Link>
            ) : (
              <div className="group">
                <div className="relative w-24 h-36 rounded-sm overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={item.posterUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 text-center max-w-[96px] line-clamp-2">
                  {item.title}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

