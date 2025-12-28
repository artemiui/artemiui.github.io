"use client";

import { X, GraduationCap, Heart, Gamepad2, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type AboutOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SaveFile = {
  id: string;
  title: string;
  playerName: string;
  timePlayed: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
};

const saveFiles: SaveFile[] = [
  {
    id: "education",
    title: "Education",
    playerName: "Artemio",
    timePlayed: "4 Years",
    skills: ["Philosophy", "Computer Science", "Mathematics"],
    icon: GraduationCap,
  },
  {
    id: "interests",
    title: "Interests",
    playerName: "Art",
    timePlayed: "∞ Years",
    skills: ["Data Science", "AI", "Film", "Music"],
    icon: Heart,
  },
  {
    id: "hobbies",
    title: "Hobbies",
    playerName: "Artemio",
    timePlayed: "Countless Hours",
    skills: ["Gaming", "Reading", "Piano", "Language Learning"],
    icon: Gamepad2,
  },
  {
    id: "projects",
    title: "Projects",
    playerName: "Art",
    timePlayed: "2 Years",
    skills: ["Web Dev", "ML", "Open Source", "Writing"],
    icon: Briefcase,
  },
];

export default function AboutOverlay({ isOpen, onClose }: AboutOverlayProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);

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

              {/* Save Files Menu */}
              <div className="mb-8">
                <h3 className="text-lg font-mono font-semibold mb-4 text-center">Load Game</h3>
                <div className="grid grid-cols-2 gap-0.5">
                  {saveFiles.map((file) => (
                    <div
                      key={file.id}
                      className="relative w-64 h-20 cursor-pointer transition-all duration-200 filter drop-shadow-lg"
                      style={{
                        backgroundImage: `url(${hoveredFile === file.id ? '/selected_about.svg' : '/unselected.svg'})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}
                      onMouseEnter={() => setHoveredFile(file.id)}
                      onMouseLeave={() => setHoveredFile(null)}
                      onClick={() => setSelectedFile(selectedFile === file.id ? null : file.id)}
                    >
                      {/* Icon placeholder in left square */}
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-gray-500/50 rounded flex items-center justify-center text-sm">
                        Icon
                      </div>
                      {/* Text in right rectangle, vertically centered */}
                      <div
                        className="absolute left-20 top-1/2 transform -translate-y-1/2 text-center font-mono text-base font-semibold"
                        style={{ fontFamily: "'NDS12', monospace" }}
                      >
                        {file.title}
                      </div>
                      {/* Details on click */}
                      {selectedFile === file.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b"
                        >
                          <p>{file.title} details coming soon...</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* About content */}
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold font-mono mb-6 text-red-600">bungiorno a tutti !</h2>
                
                <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-7">
                  <p>
                    Mi chiamo Artemio, puoi chiamarmi Art. I made this blog as a means of knowledge sharing. Currently an undergraduate philosophy student at UP Diliman. Teaching myself lots of things for fun. 
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

