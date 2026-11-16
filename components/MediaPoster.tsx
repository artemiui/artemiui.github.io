"use client";

import { useState } from "react";
import { Book, BookOpen, Film, Gamepad2, Star, StarHalf, Tv } from "lucide-react";

export const typeIcon: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  movie: Film,
  anime: Tv,
  game: Gamepad2,
  manga: BookOpen,
  "light novel": Book,
};

export const typeLabel: Record<string, string> = {
  movie: "Movie",
  anime: "Anime",
  game: "Game",
  manga: "Manga",
  "light novel": "Light novel",
};

export const verbFor: Record<string, string> = {
  movie: "Watched",
  anime: "Watched",
  game: "Played",
  manga: "Read",
  "light novel": "Read",
};

export const ratingValue = (rating: string) => {
  const n = parseFloat(rating);
  return isNaN(n) || n <= 0 ? 0 : n;
};

/** Cover art with a typed placeholder for missing or broken links. */
export function Poster({ src, title, type, className = "" }: { src?: string; title: string; type: string; className?: string }) {
  const [state, setState] = useState<"loading" | "loaded" | "error">(src ? "loading" : "error");
  const Icon = typeIcon[type] ?? Film;

  return (
    <div className={`relative aspect-[27/40] overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900 ${className}`}>
      {state === "error" ? (
        <div className="flex size-full flex-col items-center justify-center gap-2 p-3 text-center text-zinc-400 dark:text-zinc-600">
          <Icon className="size-5" strokeWidth={1.5} />
          <span className="line-clamp-3 font-mono text-[11px] leading-4">{title}</span>
        </div>
      ) : (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          ref={(img) => {
            if (img?.complete) setState(img.naturalWidth ? "loaded" : "error");
          }}
          className={`size-full object-cover transition-opacity duration-300 ${state === "loaded" ? "opacity-100" : "opacity-0"}`}
        />
      )}
      <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-zinc-950/10 dark:ring-white/10" />
    </div>
  );
}

/** Five-star row with half stars; renders nothing when unrated. */
export function Stars({ rating, className = "size-3.5" }: { rating: string; className?: string }) {
  const n = ratingValue(rating);
  if (!n) return null;
  const full = Math.floor(n);
  const half = n - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5 text-zinc-900 dark:text-zinc-100" role="img" aria-label={`${n} out of 5`}>
      {Array.from({ length: full }, (_, i) => (
        <Star key={i} className={`${className} fill-current`} strokeWidth={0} />
      ))}
      {half && <StarHalf className={`${className} fill-current`} strokeWidth={0} />}
    </span>
  );
}
