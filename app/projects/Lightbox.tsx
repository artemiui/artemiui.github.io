"use client";

import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { ProjectImageFrame } from "./ProjectImageFrame";
import type { GalleryImage } from "./data";
import { ease } from "./ui";

export interface LightboxState {
  label: string;
  images: GalleryImage[];
  index: number;
}

const control =
  "grid size-10 place-items-center rounded-full bg-black/60 text-white/90 ring-1 ring-white/10 transition-colors duration-150 hover:bg-black/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

export function Lightbox({
  state,
  onChange,
}: {
  state: LightboxState | null;
  onChange: (state: LightboxState | null) => void;
}) {
  const close = useCallback(() => onChange(null), [onChange]);
  const step = useCallback(
    (delta: number) => {
      if (!state) return;
      const n = state.images.length;
      onChange({ ...state, index: (state.index + delta + n) % n });
    },
    [state, onChange],
  );

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [state, close, step]);

  const image = state?.images[state.index];
  const many = (state?.images.length ?? 0) > 1;

  return (
    <AnimatePresence>
      {state && image && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={state.label}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 bg-zinc-950/[0.97]"
          />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease }}
            className="relative z-10 flex max-h-[94dvh] w-full max-w-4xl flex-col"
          >
            <div className="relative flex w-full items-center justify-center p-2 sm:p-4">
              <ProjectImageFrame src={image.src} alt={image.title || state.label} />
              <button type="button" onClick={close} aria-label="Close" className={`${control} absolute right-3 top-3 sm:right-5 sm:top-5`}>
                <X className="size-4" strokeWidth={1.5} />
              </button>
              {many && (
                <>
                  <button type="button" onClick={() => step(-1)} aria-label="Previous image" className={`${control} absolute left-2 top-1/2 -translate-y-1/2 sm:left-4`}>
                    <ChevronLeft className="size-5" strokeWidth={1.5} />
                  </button>
                  <button type="button" onClick={() => step(1)} aria-label="Next image" className={`${control} absolute right-2 top-1/2 -translate-y-1/2 sm:right-4`}>
                    <ChevronRight className="size-5" strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>

            <div className="w-full space-y-2 px-4 pt-3 sm:px-6">
              <p className="font-[family-name:var(--font-display-mono)] text-xs text-zinc-400 tabular-nums">
                {state.label}
                {many && ` · ${String(state.index + 1).padStart(2, "0")} / ${String(state.images.length).padStart(2, "0")}`}
              </p>
              {image.title && <h3 className="text-base font-medium text-white sm:text-lg">{image.title}</h3>}
              <p className="max-w-3xl text-sm leading-6 text-zinc-300">{image.description}</p>
              {image.url && (
                <a
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-white/10 px-3 text-sm font-medium text-white ring-1 ring-white/15 transition-colors duration-150 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  View on Facebook
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
