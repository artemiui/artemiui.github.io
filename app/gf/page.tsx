"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "@/lib/themeContext";

const photos = [
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
  "The lucky one you taught can take breaks.",
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

// Minimalist Gen 1 Pokemon-style Dialogue Box
function PokemonDialogue({ onUnlocked }: { onUnlocked: () => void }) {
  const [turn, setTurn] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"YES" | "NO">("YES");
  const [displayedText, setDisplayedText] = useState("");

  const dialogueScript = [
    {
      text: "You are the most beautiful girl in the world.",
      options: ["YES", "NO"],
    },
    {
      text: "baliw ka ba",
      options: ["YES", "NO"],
    },
    {
      text: "now u just lyin",
      options: ["YES", "NO"],
    },
    {
      text: "wala ka nang magagawa. pag maganda ka, maganda ka. mahal kita.",
      options: ["YES", "YES!"],
    },
  ];

  const currentDialogue = dialogueScript[Math.min(turn, dialogueScript.length - 1)];

  // Typewriter effect for dialogue
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const target = currentDialogue.text;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(target.slice(0, i));
      if (i >= target.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [turn, currentDialogue.text]);

  const handleSelect = (choice: string) => {
    if (choice === "YES" || choice === "YES!") {
      onUnlocked();
    } else {
      setTurn((prev) => Math.min(prev + 1, dialogueScript.length - 1));
      setSelectedOption("YES");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-lg font-mono select-none">
        <div className="p-4 sm:p-6 text-foreground">
          {/* Text Message with blinking cursor */}
          <div className="min-h-[75px] text-sm sm:text-base leading-relaxed tracking-wide font-medium">
            <span>{displayedText}</span>
            <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse align-middle" />
          </div>

          {/* Choice Box */}
          <div className="mt-6 flex justify-end">
            <div className="inline-flex flex-col min-w-[120px] space-y-2">
              {currentDialogue.options.map((opt) => {
                const isCurrent = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    onMouseEnter={() => setSelectedOption(opt as "YES" | "NO")}
                    className="flex items-center text-left text-xs sm:text-sm font-semibold tracking-wider hover:opacity-100 transition-opacity text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                  >
                    <span className="w-4 text-xs font-bold text-foreground">
                      {isCurrent ? "▶" : " "}
                    </span>
                    <span className={`ml-1 uppercase ${isCurrent ? "text-foreground font-bold" : ""}`}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Animated Star Background
function StarryBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function ForYouPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const { setTheme } = useTheme();

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTheme("dark");
  };

  // Auto-play slideshow timer (every 4.5 seconds)
  useEffect(() => {
    if (!isUnlocked) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isUnlocked]);

  // Track active paragraph based on scroll position for focused reading highlight
  useEffect(() => {
    if (!isUnlocked) return;
    const handleScroll = () => {
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
  }, [isUnlocked]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <>
      {/* Starry Background when unlocked */}
      {isUnlocked && <StarryBackground />}

      {!isUnlocked ? (
        /* Dialogue Gatekeeper: blocks only from the tabs down, fully covering the section */
        <div className="w-full min-h-[520px] flex items-center justify-center py-10">
          <PokemonDialogue onUnlocked={handleUnlock} />
        </div>
      ) : (
        /* Main Page Content: only rendered and visible once unlocked */
        <div className="space-y-16 pb-32">
          {/* Sticky 16:9 Slideshow Showcase */}
          <div className="sticky top-6 z-20 flex justify-center py-2 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative group aspect-video w-full max-w-[560px] sm:max-w-[640px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md overflow-hidden shadow-2xl pointer-events-auto"
          >
            {/* Images with crossfade animation */}
            <AnimatePresence initial={false}>
              <motion.div
                key={photos[currentIndex].src}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={photos[currentIndex].src}
                  alt={photos[currentIndex].alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

            {/* Prev / Next navigation buttons on hover */}
            <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="pointer-events-auto p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/80 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="pointer-events-auto p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/80 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Photo Counter Indicator */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono z-10 shadow pointer-events-none">
              <span>{currentIndex + 1}</span>
              <span className="text-zinc-400">/</span>
              <span className="text-zinc-400">{photos.length}</span>
            </div>
          </motion.div>
        </div>

        {/* Scrolling Poem Content: Retaining paragraph highlighting and prior spacing */}
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
      )}
    </>
  );
}
