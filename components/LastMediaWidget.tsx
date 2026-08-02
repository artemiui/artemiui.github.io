"use client";

import { useMemo } from "react";
import { Calendar, Star } from "lucide-react";
import {
  getLatestMediaItem,
  getLatestItemSentence,
  type MediaItem,
} from "@/lib/mediaService";

interface LastMediaWidgetProps {
  onSelect?: (item: MediaItem) => void;
  className?: string;
}

function renderStarRating(ratingStr: string) {
  const num = parseFloat(ratingStr);
  if (isNaN(num) || num <= 0) {
    return <span className="text-zinc-400 text-xs font-sans">Unrated</span>;
  }

  const fullStars = Math.floor(num);
  const hasHalf = num % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-3.5 h-3.5 fill-current" />
      ))}
      {hasHalf && (
        <span className="text-[11px] font-sans leading-none text-amber-500 font-bold ml-0.5">
          ½
        </span>
      )}
      <span className="ml-1 text-xs font-sans font-medium text-zinc-600 dark:text-zinc-400">
        {num.toFixed(1)}
      </span>
    </div>
  );
}

export default function LastMediaWidget({
  onSelect,
  className = "",
}: LastMediaWidgetProps) {
  const latestItem = useMemo(() => getLatestMediaItem(), []);

  if (!latestItem) return null;

  const { verb, noun } = getLatestItemSentence(latestItem.type);
  const displayDate = latestItem.completed || latestItem.started;
  const hasBody = Boolean(latestItem.body && latestItem.body.trim() !== "");

  return (
    <div
      onClick={() => onSelect?.(latestItem)}
      className={`group cursor-pointer py-5 border-b border-zinc-200 dark:border-zinc-800 bg-transparent transition-colors ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
        {/* Enlarged 27:40 Aspect Ratio Cover Poster */}
        <div className="w-36 sm:w-44 md:w-48 aspect-[27/40] bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden flex-shrink-0 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm group-hover:shadow-md transition-all duration-300">
          {latestItem.cover_link ? (
            <img
              src={latestItem.cover_link}
              alt={latestItem.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400 font-sans p-3 text-center">
              {latestItem.title}
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0 space-y-2 pt-0.5">
          {/* Subheading Label */}
          <p className="text-xs sm:text-sm font-mono font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            My last {verb} {noun} was
          </p>

          {/* Media Title in Mono Font for Emphasis */}
          <h2 className="text-2xl sm:text-3xl font-mono font-bold text-foreground leading-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {latestItem.title}
          </h2>

          {/* Rating and Date Row */}
          <div className="flex flex-wrap items-center gap-3 pt-0.5">
            {renderStarRating(latestItem.rating)}
            {displayDate && (
              <p className="text-xs font-sans text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 border-l border-zinc-200 dark:border-zinc-800 pl-3">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>{displayDate}</span>
              </p>
            )}
          </div>

          {/* Body Note (Renders cleanly when present, adapts compactly when absent) */}
          {hasBody && (
            <div className="pt-3 mt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                {latestItem.body}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
