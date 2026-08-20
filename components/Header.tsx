"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname?.startsWith("/blog");
    }
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const getLinkClass = (href: string, extraClasses: string = "") => {
    const active = isLinkActive(href);
    return `${
      active
        ? "text-foreground font-semibold"
        : "text-zinc-600 dark:text-zinc-400 hover:text-foreground"
    } transition-colors whitespace-nowrap ${extraClasses}`.trim();
  };

  return (
    <header className="flex flex-col gap-4">
      {/* Top bar with Theme Toggle */}
      <div className="flex justify-end items-center">
        <ThemeToggle />
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
          className={getLinkClass("/")}
        >
          blog
        </Link>
        <Link
          href="/about"
          className={getLinkClass("/about")}
        >
          cv
        </Link>
        <Link
          href="/media"
          className={getLinkClass("/media")}
        >
          media
        </Link>
        <Link
          href="/recommendations"
          className={getLinkClass("/recommendations")}
        >
          recommendations
        </Link>
        <Link
          href="https://linkedin.com/in/artemioarcega"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors whitespace-nowrap"
        >
          linkedin
        </Link>
        <Link
          href="https://github.com/artemiui"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors whitespace-nowrap"
        >
          github
        </Link>
        <Link
          href="/gf"
          className={getLinkClass("/gf", "font-semibold")}
        >
          ♡
        </Link>
      </nav>
    </header>
  );
}
