"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Home } from "lucide-react";
import NetworkStatus from "./NetworkStatus";

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // TODO: Replace with actual last modified date from CMS or build info
  const lastSavedDate = "2025-12-28";

  return (
    <header className="flex flex-col gap-4">
      {/* System Time and Network Status */}
      <div className="flex justify-between items-center text-xs font-mono text-zinc-500 dark:text-zinc-400">
        <span>{currentTime}</span>
        <NetworkStatus lastUpdatedDate={lastSavedDate} />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <Image
            src="/placeholder-avatar.jpg"
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-sm object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold font-sans text-black dark:text-white break-words leading-tight">artemio</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 break-words">
            【=◈︿◈=】
          </p>
        </div>
      </div>
      <nav className="w-full flex flex-wrap items-center justify-start gap-x-3 sm:gap-x-5 gap-y-2 text-xs sm:text-sm font-mono leading-relaxed">
        <Link
          href="/"
          className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors flex items-center justify-center whitespace-nowrap"
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
        </Link>
        <Link
          href="/about"
          className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors whitespace-nowrap"
        >
          About
        </Link>
        <Link
          href="/media"
          className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors whitespace-nowrap"
        >
          Artboxd
        </Link>
        <Link
          href="/recommendations"
          className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors whitespace-nowrap"
        >
          Recommendations
        </Link>
        <Link
          href="https://linkedin.com/in/artemioarcega"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors whitespace-nowrap"
        >
          LinkedIn
        </Link>
        <Link
          href="https://github.com/artemiui"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors whitespace-nowrap"
        >
          GitHub
        </Link>
        <Link
          href="/gf"
          className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors font-semibold whitespace-nowrap"
        >
          ♡
        </Link>
      </nav>
    </header>
  );
}
