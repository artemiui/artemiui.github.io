"use client";

import { ExternalLink, Sparkles } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-sm text-foreground flex items-center gap-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Akasha System
              <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                Genshin Impact
              </span>
            </h4>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
              UID: {uid}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 group-hover:text-foreground transition-colors">
          <span>View Profile</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>
    </a>
  );
}
