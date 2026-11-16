"use client";

import { useMemo } from "react";
import { formatMediaDate, getLatestMediaItem, type MediaItem } from "@/lib/mediaService";
import { Poster, Stars, verbFor } from "@/components/MediaPoster";

interface LastMediaWidgetProps {
  onSelect?: (item: MediaItem) => void;
  className?: string;
}

export default function LastMediaWidget({ onSelect, className = "" }: LastMediaWidgetProps) {
  const item = useMemo(() => getLatestMediaItem(), []);
  if (!item) return null;

  const date = formatMediaDate(item.completed || item.started);
  const body = item.body?.trim();

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      className={`group flex w-full items-start gap-5 rounded-lg text-left sm:gap-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-4 focus-visible:ring-offset-background cursor-pointer ${className}`}
    >
      <Poster
        src={item.cover_link}
        title={item.title}
        type={item.type}
        className="w-28 shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_32px_-12px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:w-40"
      />
      <div className="min-w-0 pt-1">
        <p className="text-sm text-zinc-500 sm:text-base">I last {(verbFor[item.type] ?? "finished").toLowerCase()}</p>
        <h2 className="mt-1.5 font-mono text-xl font-semibold leading-tight text-balance text-foreground transition-colors duration-150 group-hover:text-red-600 sm:text-3xl dark:group-hover:text-red-400">
          {item.title}
        </h2>
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
          {date && <span>{date}</span>}
          <Stars rating={item.rating} />
        </p>
        {body && <p className="mt-4 line-clamp-4 max-w-prose text-sm leading-6 text-zinc-600 dark:text-zinc-400">{body}</p>}
      </div>
    </button>
  );
}
