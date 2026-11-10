"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "@/lib/themeContext";

const photos = [{ src: "/gf-nov11.png", alt: "Artem kissing Sophia in a mirror surrounded by plants and colorful lights" }];
const poemParagraphs = [
"the time you always and never fail to mention.",
"how long it has it already been since we first met,",
"a gentle love that suddenly swooped by and made my life a life of happiness,",
"how's my hoodie from that day?",
"do you still remember the first time i started hitting off my dark jokes on you?",
"it scared me how you'd react",
"what about that one time under the overpass in katip, waiting for your bus?",
"or our first time riding a bus to bridgetowne together?",
"it is by this time that you should come to know,",
"that i have withdrawn from thinking of silencing my world of its worthless echoes",
"that in every stroke of your fingers upon my coarse skin that my cells become magnified to you more than what is logically necessary",
"all there is, and should be, and will be, are you and i.",
"i am but a minute star in the sea of your glimmering dreams",
"and i am happily sailing; forever, and ever.",
"my darling beloved.",
"happy 6 months, sophia:3",
];

const asciiFlowers = `                    _
                  :=+++++=-
                -**+--::-=**+++=:
              -#*-:        :---@*
             =@=             :=%=
            =@-            :**=:
           :@=            :%+:
           +#:            =@:
          :%+             :#*::
           %+              :=***+++=--::
           +%             ::   ::--==++*+=-:
           -@=           :+**=:        :-=+**=:
            =%=    -:      :-*%-    :      :-*#-
             *@*-: =#-        =%+-            -@=
            =@--+*+=+#*-       :=*+=-::--::    =@-
         -=*#-:-=*%*=:-**=-:     :-+@+ =++++:  :%=
         =##++++=-:     :=+**+++*++++=----=@=  -@-
           :::              :::::=#%*======-  :#*:
                                 -==+*=::--+- -@-
                                     -=++#@*: =@:
                                         *#  -@=
                                         -@++%=
                                         :*+=:`;

// Minimalist Gen 1 Pokemon-style Dialogue Box
function PokemonDialogue({ onUnlocked }: { onUnlocked: () => void }) {
  const [turn, setTurn] = useState(0);
  const [selectedOption, setSelectedOption] = useState("HI");
  const [displayedText, setDisplayedText] = useState("");

  const dialogueScript = [
    {
      text: "hello, my love.",
      options: ["HI", "NO"],
    },
    {
      text: "pls say hi back",
      options: ["HI", "NO"],
    },
    {
      text: "bruhnion",
      options: ["HI", "NO"],
    },
    {
      text: "cmon let me get you in on a lil secret",
      options: ["HI", "YES!"],
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
    if (choice === "HI" || choice === "YES" || choice === "YES!") {
      onUnlocked();
    } else {
      setTurn((prev) => Math.min(prev + 1, dialogueScript.length - 1));
      setSelectedOption("HI");
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
                    onMouseEnter={() => setSelectedOption(opt)}
                    onFocus={() => setSelectedOption(opt)}
                    className="flex items-center min-h-11 focus-visible:outline focus-visible:outline-offset-4 active:scale-[0.97] text-left text-xs sm:text-sm font-semibold tracking-wider hover:opacity-100 transition-opacity text-zinc-600 dark:text-zinc-400 hover:text-foreground"
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
  const reducedMotion = useReducedMotion();
  const stars = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (i * 37 + 13) % 100,
      y: (i * 61 + 7) % 100,
      size: (i % 3) + 1,
      duration: (i % 4) + 3,
      delay: i % 3,
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
          animate={reducedMotion ? { opacity: 0.4 } : { opacity: [0.15, 0.7, 0.15] }}
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
  const reducedMotion = useReducedMotion();
  const [wish, setWish] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentIndex] = useState(0);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const { setTheme } = useTheme();

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTheme("dark");
  };

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
        <div className="space-y-16 pb-72 motion-reduce:[&_*]:!animate-none motion-reduce:[&_*]:!transition-none">
<header className="text-center pt-10 space-y-5">
<h1 className="font-mono text-5xl sm:text-6xl font-light tracking-tight tabular-nums">11:11</h1>
<button aria-pressed={wish} onClick={() => setWish(true)} className="min-h-11 px-5 rounded-full border border-zinc-600 text-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-offset-4 active:scale-[0.97]">{wish ? "wish made" : "make a wish"}</button>
<p aria-live="polite" className="min-h-12 mx-auto max-w-xs text-sm text-zinc-300 leading-relaxed">{wish ? "all there is, and should be, and will be, are you and i." : "a little moment, just for you."}</p>
</header>
          {/* Sticky 16:9 Slideshow Showcase */}
          <div className="relative z-10 flex justify-center py-2 pointer-events-none">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative group aspect-[3/4] w-full max-w-[360px] sm:max-w-[420px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md overflow-hidden shadow-2xl pointer-events-auto"
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

          </motion.div>
        </div>

        {/* Scrolling Poem Content: Retaining paragraph highlighting and prior spacing */}
        <div className="max-w-xl mx-auto space-y-36 px-4 pt-16 sm:pt-20 relative z-10 font-sans">
          {poemParagraphs.map((paragraph, pIdx) => {
            const isActive = pIdx === activeParagraphIndex;
            const isLuckyMe = pIdx >= poemParagraphs.length - 2;
            const isOpening = pIdx === 0;

            return (
              <div
                key={pIdx}
                id={`poem-para-${pIdx}`}
                className={`transition-[opacity,transform,color,max-height,margin] duration-500 min-h-[90px] flex items-center justify-center text-center cursor-default ${
                  isActive
                    ? "opacity-100 scale-100 text-zinc-900 dark:text-zinc-100 font-normal"
                    : "opacity-100 scale-[0.98] text-zinc-600 dark:text-zinc-400"
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
            <pre className="font-mono text-[7px] min-[400px]:text-[9px] sm:text-xs text-zinc-700 dark:text-zinc-300 leading-none select-none whitespace-pre tracking-normal">
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
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-[calc(100vw-2.5rem)] sm:w-80 max-w-[340px] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-3 transition-[opacity,transform,color,max-height,margin] duration-300"
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
                  11:11 · for sophia
                </p>
                <p className="text-[10px] font-sans text-zinc-500 dark:text-zinc-400 truncate leading-tight">
                  Our soundtrack
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <a
                href="https://www.youtube.com/watch?v=pFBFSBgM6og"
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
                aria-expanded={!isMinimized}
                aria-controls="music-player"
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
            id="music-player" inert={isMinimized}
            className={`transition-[opacity,transform,color,max-height,margin] duration-300 overflow-hidden ${
              isMinimized ? "max-h-0 opacity-0 mt-0" : "max-h-56 opacity-100 mt-2.5"
            }`}
          >
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-zinc-200/60 dark:border-zinc-800/60 shadow-inner">
              <iframe
                src="https://www.youtube.com/embed/pFBFSBgM6og?autoplay=1&playsinline=1"
                title="Our soundtrack - Your Universe"
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
