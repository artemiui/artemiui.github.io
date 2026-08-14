"use client";

import { ExternalLink } from "lucide-react";

interface GenshinStatsWidgetProps {
  uid?: string;
  profileUrl?: string;
  className?: string;
}

export default function GenshinStatsWidget({
  uid = "833534626",
  profileUrl = "https://akasha.cv/profile/833534626",
  className = "",
}: GenshinStatsWidgetProps) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block py-2 bg-transparent transition-colors ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="min-w-0">
            <h4 className="font-sans font-semibold text-xs sm:text-sm text-foreground flex items-center gap-1.5 flex-wrap group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              Akasha System
              <span className="text-[10px] font-sans font-medium px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                Genshin Impact
              </span>
            </h4>
            <p className="text-[11px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
              UID: {uid}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 group-hover:text-foreground transition-colors self-start sm:self-auto">
          <span>View Profile</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>
    </a>
  );
}
