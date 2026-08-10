"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { motion } from "framer-motion";

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
  return (
    <div className="space-y-8">
      {/* Header & Back Link Container */}
      <div className="space-y-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-foreground transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="flex items-center gap-2"
        >
          <h1 className="text-3xl font-mono font-semibold text-rose-600 dark:text-rose-500">
            happy monthsary, mia principessa
          </h1>
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
        </motion.div>
      </div>

      {/* 1. 16:9 Framed Image */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="w-full"
      >
        <div className="relative aspect-[16/9] w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 overflow-hidden shadow-md group transition-all">
          <img
            src="/motmot-photo.jpg"
            alt="Welcome Home"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
        </div>
      </motion.div>

      {/* Poem Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.17 }}
        className="w-full py-4 text-center text-zinc-600 dark:text-zinc-400 font-serif leading-relaxed"
      >
        <p className="whitespace-pre-line text-sm sm:text-base">
          {`Entropy. As with all physical objects, they all are in perpetual motion, a claim as old as, strengthened even, from Aristotle. My love, we will rebel. We will not join the cloud of chaos that awaits the entire universe for we, together, will constitute our own homogeneity. Our own little cloud of chaos. Our love.`}
        </p>
      </motion.div>

      {/* 2. Spotify Playlist Embed */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="w-full"
      >
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/52gp9QLteAL0VLZ9rIecZ4?utm_source=generator&si=94b17393aaf94689"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </motion.div>

      {/* 3. BOTTOM: ASCII Flowers */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.22 }}
        className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-center"
      >
        <div className="overflow-x-auto w-full max-w-full flex justify-center py-2">
          <pre className="font-mono text-[10px] sm:text-xs text-rose-600 dark:text-rose-400 leading-none select-none whitespace-pre tracking-normal">
            {asciiFlowers}
          </pre>
        </div>
      </motion.div>
    </div>
  );
}
