"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

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
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="space-y-8">
      {/* 1. 1:1 Framed Image */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="w-full flex justify-center"
      >
        <div className="relative aspect-square w-full max-w-[540px] rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 overflow-hidden shadow-md group transition-all">
          <img
            src="/gf-photo.png"
            alt="For You"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />

          {/* Subtle Now Playing Badge on Photo */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-mono shadow pointer-events-none">
            <Music className="w-3 h-3 animate-pulse text-zinc-300" />
            <span className="truncate max-w-[180px] sm:max-w-none">
              Dance Me to the End of Love
            </span>
          </div>
        </div>
      </motion.div>

      {/* 2. BOTTOM: ASCII Flowers */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-center"
      >
        <div className="overflow-x-auto w-full max-w-full flex justify-center py-2">
          <pre className="font-mono text-[10px] sm:text-xs text-zinc-700 dark:text-zinc-300 leading-none select-none whitespace-pre tracking-normal">
            {asciiFlowers}
          </pre>
        </div>
      </motion.div>

      {/* 3. Floating Overlay Player */}
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
                Dance Me to the End of Love
              </p>
              <p className="text-[10px] font-sans text-zinc-500 dark:text-zinc-400 truncate leading-tight">
                Leonard Cohen
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <a
              href="https://www.youtube.com/watch?v=EImVucJO7Ok"
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
              src="https://www.youtube.com/embed/EImVucJO7Ok?autoplay=1&enablejsapi=1&playsinline=1"
              title="Leonard Cohen - Dance Me to the End of Love"
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
