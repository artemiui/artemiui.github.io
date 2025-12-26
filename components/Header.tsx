"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AboutOverlay from "./AboutOverlay";

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-[100px] h-[100px] rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <Image
              src="/placeholder-avatar.gif"
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-sm object-cover"
              unoptimized
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold font-mono text-red-600">artemio</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            【=◈︿◈=】 
            </p>
          </div>
        </div>
        <nav className="flex gap-6 text-sm font-mono">
          <button
            onClick={() => setIsAboutOpen(true)}
            className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
          >
            About
          </button>
          <Link
            href="/recommendations"
            className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
          >
            Recommendations
          </Link>
          <Link
            href="https://instagram.com/virtualsarili"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
          >
            Graphics
          </Link>
          <Link
            href="https://linkedin.com/in/artemioarcega"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/artemiui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://medium.com/@artemioarcega"
            className="text-zinc-600 dark:text-zinc-400 hover:text-foreground transition-colors"
          >
            (More) Essays
          </Link>
        </nav>
      </header>
      <AboutOverlay isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
}

