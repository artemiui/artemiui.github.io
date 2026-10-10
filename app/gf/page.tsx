"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const photos = [
  {
    src: "/oct11/2cb0071b-bb33-453e-8f88-f79b86c390bc.jpg",
    alt: "Memory 1",
  },
  {
    src: "/oct11/94a2f697-9327-4821-bff5-64f22afe8813.jpg",
    alt: "Memory 2",
  },
  {
    src: "/oct11/9b580256-70e9-4181-b0fc-ae2827d4d864.jpg",
    alt: "Memory 3",
  },
  {
    src: "/oct11/c98bdb03-fce7-4c82-a0c1-f26f068056a0.jpg",
    alt: "Memory 4",
  },
  {
    src: "/oct11/cf53d662-b56c-45b1-8c9d-6423095e5ac4.jpg",
    alt: "Memory 5",
  },
  {
    src: "/oct11/dbec6096-dac5-4466-b31e-0892693b0864.jpg",
    alt: "Memory 6",
  },
];

const poemParagraphs = [
  "Take as many pictures as you can; especially of the things that matter.",
  "But how exactly do you do something like that when that 'thing that matters' is the most beautiful person to ever grace your eyes?",
  "That a photo only captures the minute details of an infinitely beautiful, continuous being. The one that reminded me that love isn't supposed to be being stabbed in the chest every waking day.",
  "The one that showed me that love can be fun, not cannibalistic. The one that showed me that to truly cannibalize is to feed into each other, not parasitically.",
  "Because, frankly, I never thought I'd find you. And there hasn't been a single day of my life since I met you that I've never been scared of losing you.",
  "You're too perfect. I have no idea how you stumbled upon me. You're too intelligent. I have no idea how you stumbled upon a pea-brain like me who can't discern right from wrong.",
  "I want to walk inside your mind. Understand how it came to settling with me. Because frankly, I'll always be the lucky one.",
  "The lucky one you taught how to love truly.",
  "The lucky one you taught how to not take myself too seriously.",
  "The lucky one you taught that I can take breaks.",
  "The lucky one you loved.",
  "Lucky me,\n\nlucky me..",
];

const asciiFlowers = `                    _
                  _(_)_                          wWWWw   _
      @@@@       (_)@(_)   vVVVv     _     @@@@  (___) _(_)_
     @@()@@ wWWWw  (_)\\    (___)   _(_)_  @@()@@   Y  (_)@(_)
      @@@@  (___)     \`|/    Y    (_)@(_)  @@@@   \\|/   (_)\\
       /      Y       \\|    \\|/    /(_)    \\|      |/      |
    \\ |     \\ |/       | / \\ | /  \\|/       |/    \\|      \\|/
jgs \\|//   \\|///  \\\\\\|//\\\\\\|/// \\|///  \\\\\\|//  \\|//  \\\\\\|// 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^`;

export default function ForYouPage() {
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  // Map each paragraph index smoothly to one of the photos
  const activePhotoIndex = Math.min(
    photos.length - 1,
    Math.floor((activeParagraphIndex / (poemParagraphs.length - 1)) * photos.length)
  );

  useEffect(() => {
    const handleScroll = () => {
      // Find the paragraph currently in view target
      // Target area is roughly 60% down the screen, below the sticky photo preview
      const targetY = window.innerHeight * 0.62;
      let closestIdx = 0;
      let minDistance = Infinity;

      poemParagraphs.forEach((_, idx) => {
        const el = document.getElementById(`poem-para-${idx}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const paraCenter = rect.top + rect.height / 2;
          const dist = Math.abs(targetY - paraCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        }
      });

      setActiveParagraphIndex(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="space-y-16 pb-32">
      {/* Sticky Photo Frame Showcase */}
      <div className="sticky top-6 z-20 flex justify-center py-2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-video w-full max-w-[560px] sm:max-w-[640px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md overflow-hidden shadow-2xl pointer-events-auto"
        >
          {/* Photos with smooth crossfade */}
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={false}
              animate={{
                opacity: index === activePhotoIndex ? 1 : 0,
                scale: index === activePhotoIndex ? 1 : 1.04,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}

          {/* Vignette / subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

          {/* Photo Pagination Indicator */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono z-10 shadow">
            <span>{activePhotoIndex + 1}</span>
            <span className="text-zinc-400">/</span>
            <span className="text-zinc-400">{photos.length}</span>
          </div>
        </motion.div>
      </div>

      {/* Scrolling Poem Content: Separate highlights per paragraph */}
      <div className="max-w-xl mx-auto space-y-36 px-4 pt-16 sm:pt-20 relative z-10 font-sans">
        {poemParagraphs.map((paragraph, pIdx) => {
          const isActive = pIdx === activeParagraphIndex;
          const isLuckyMe = paragraph.includes("Lucky me");
          const isOpening = pIdx === 0;

          return (
            <div
              key={pIdx}
              id={`poem-para-${pIdx}`}
              className={`transition-all duration-500 min-h-[90px] flex items-center justify-center text-center cursor-default ${
                isActive
                  ? "opacity-100 scale-100 text-zinc-900 dark:text-zinc-100 font-normal"
                  : "opacity-35 scale-[0.98] text-zinc-400 dark:text-zinc-500"
              }`}
            >
              <div className="space-y-2 max-w-lg">
                {paragraph.split("\n\n").map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className={`leading-relaxed tracking-wide ${
                      isOpening
                        ? "text-lg sm:text-xl font-medium"
                        : isLuckyMe
                        ? "text-base sm:text-lg italic font-medium"
                        : "text-base sm:text-lg"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ASCII Flowers */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="pt-16 border-t border-zinc-200 dark:border-zinc-800 flex justify-center relative z-10"
      >
        <div className="overflow-x-auto w-full max-w-full flex justify-center py-2">
          <pre className="font-mono text-[10px] sm:text-xs text-zinc-700 dark:text-zinc-300 leading-none select-none whitespace-pre tracking-normal">
            {asciiFlowers}
          </pre>
        </div>
      </motion.div>

      {/* Floating Overlay Player */}
      <motion.aside
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        aria-label="Audio overlay player"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-[calc(100vw-2.5rem)] sm:w-80 max-w-[340px] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-3 transition-all duration-300"
      >
        {/* Overlay Player Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {/* Animated Equalizer Wave */}
            <div className="flex items-end gap-0.5 h-3.5 w-3.5 flex-shrink-0">
              <span className="w-1 bg-zinc-800 dark:bg-zinc-200 rounded-full animate-[bounce_0.8s_infinite_ease-in-out_0.1s] h-full" />
              <span className="w-1 bg-zinc-800 dark:bg-zinc-200 rounded-full animate-[bounce_0.8s_infinite_ease-in-out_0.3s] h-2/3" />
              <span className="w-1 bg-zinc-800 dark:bg-zinc-200 rounded-full animate-[bounce_0.8s_infinite_ease-in-out_0.2s] h-4/5" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-mono font-medium text-foreground truncate leading-tight">
                Your Universe
              </p>
              <p className="text-[10px] font-sans text-zinc-500 dark:text-zinc-400 truncate leading-tight">
                Rico Blanco
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <a
              href="https://www.youtube.com/watch?v=m-fNVB-fAjk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-md text-zinc-500 hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Open in YouTube"
              aria-label="Open in YouTube"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-md text-zinc-500 hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title={isMinimized ? "Expand player" : "Minimize player"}
              aria-label={isMinimized ? "Expand player" : "Minimize player"}
            >
              {isMinimized ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Video Frame: stays mounted so audio persists even when minimized */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isMinimized ? "max-h-0 opacity-0 mt-0" : "max-h-56 opacity-100 mt-2.5"
          }`}
        >
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-zinc-200/60 dark:border-zinc-800/60 shadow-inner">
            <iframe
              src="https://www.youtube.com/embed/m-fNVB-fAjk?autoplay=1&enablejsapi=1&playsinline=1"
              title="Rico Blanco - Your Universe"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
