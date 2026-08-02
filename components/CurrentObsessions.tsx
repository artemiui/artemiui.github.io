"use client";

import { Gamepad2, Film, Music, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export type ObsessionType = "game" | "film" | "music" | "book";

export type Obsession = {
  title: string;
  type: ObsessionType;
  creatorOrYear?: string;
  coverUrl: string;
  link?: string;
  notes?: string;
};

// Easily add, edit, or remove obsessions in this array!
export const currentObsessionsData: Obsession[] = [
  {
    title: "Genshin Impact",
    type: "game",
    creatorOrYear: "HoYoverse",
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHDzL49CF1DAhs6i_mhS51IEWuyQX-Ij-2_NR2qavZg&s=10",
    link: "https://genshin.hoyoverse.com/",
    notes: "A hidden gem of storytelling and worldbuilding lies beneath the glamour.",
  },
  {
    title: "The Backrooms",
    type: "film",
    creatorOrYear: "Kane Pixels",
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo5WZpPVH05uZ3JWfq-vASJcyDc6MWZpC0f8AAtK5ZpQ&s",
    link: "https://www.youtube.com/watch?v=H4dGqzMaYy8",
    notes: "Everything I love about surrealism, Silent Hill, and the Library of Babel.",
  },
  {
    title: "The Odyssey",
    type: "film",
    creatorOrYear: "Christopher Nolan (2026)",
    coverUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8TOAFa5BgxyDDco_hDgnaK5Zk6JO6QKsdCBPNAlmHU005fszGV_wrNghF&s=10",
    notes: "Cinematic adaptation of Homer's epic journey.",
  },
];

const typeIconMap = {
  game: Gamepad2,
  film: Film,
  music: Music,
  book: BookOpen,
};

interface CurrentObsessionsProps {
  obsessions?: Obsession[];
  className?: string;
}

export default function CurrentObsessions({
  obsessions = currentObsessionsData,
  className = "",
}: CurrentObsessionsProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-mono font-semibold text-zinc-800 dark:text-zinc-200">
          Current Obsessions
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {obsessions.map((item, index) => {
          const Icon = typeIconMap[item.type] || Film;

          return (
            <motion.div
              key={index}
              className="group relative flex flex-col space-y-3"
              whileHover={{ y: -5 }}
            >
              {/* Media Aspect Ratio Cover Container matching Recommendations */}
              <div className="relative aspect-[4/5] w-full bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                <img
                  src={item.coverUrl}
                  alt={item.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />

                {/* Icon-Only Overlay Badge */}
                <div className="absolute top-2 left-2 flex items-center justify-center p-1.5 rounded-md bg-black/60 backdrop-blur-md text-white shadow">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Metadata below the cover image */}
              <div className="space-y-1">
                <h4 className="font-medium text-foreground leading-tight text-sm">
                  {item.title}
                </h4>
                {item.creatorOrYear && (
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {item.creatorOrYear}
                  </p>
                )}
                {item.notes && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 pt-1 leading-relaxed">
                    {item.notes}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
