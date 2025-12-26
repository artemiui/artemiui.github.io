"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type AboutOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AboutOverlay({ isOpen, onClose }: AboutOverlayProps) {
  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-40"
            onClick={onClose}
          />

          {/* Overlay content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full md:max-h-[90vh] z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-lg shadow-2xl p-8 md:p-12">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              </button>

              {/* About content */}
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold font-mono mb-6 text-red-600">bungiorno a tutti !</h2>
                
                <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-7">
                  <p>
                    I made this blog as a means of knowledge sharing. As an autodidact and a naturally curious person,
                    avenues like this allow me to express myself freely.
                  </p>
                  
                  <p>
                    Expect topics from data science, computer vision, politics, fintech, philosophy, language-learning, video games, film, and waaaayyy more.
                    The thing is: to never limit yourself with what you can learn. We are born curious. Cater to it.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

