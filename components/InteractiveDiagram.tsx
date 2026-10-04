"use client";

import React, { useState, useRef } from "react";
import { Maximize2, RotateCcw } from "lucide-react";

interface InteractiveDiagramProps {
  src?: string;
  title?: string;
  className?: string;
}

export default function InteractiveDiagram({
  src = "/series-convergence/index.html",
  title = "Series Convergence Decision Tree",
  className = "",
}: InteractiveDiagramProps) {
  const [key, setKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className={`my-6 w-full ${className}`}>
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden flex flex-col">
        {/* Minimalist Top Control Bar */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3">
          <h3 className="text-xs sm:text-sm font-mono font-medium text-zinc-900 dark:text-zinc-100 truncate">
            {title}
          </h3>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-2xs"
              title="Reset view"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity shadow-2xs"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Fullscreen</span>
            </a>
          </div>
        </div>

        {/* Embedded Iframe */}
        <div className="relative w-full h-[620px] sm:h-[680px] bg-white dark:bg-[#09090b]">
          <iframe
            key={key}
            ref={iframeRef}
            src={src}
            title={title}
            className="w-full h-full border-0 block"
            loading="lazy"
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  );
}
